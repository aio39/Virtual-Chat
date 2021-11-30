import service
import cv2
import sys
import time
import socketio
from threading import Thread
from queue import Queue

if sys.argv[1]:
    sys.argv[1] = int(sys.argv[1])
else:
    sys.argv[1] = int(input('Input your camera number id: '))

# log verbose
is_log = True if len(sys.argv) >= 3 and sys.argv[2] == 'log' else False

def log_print(*args):
    if is_log: print(*args)

user_name = input('Input user name: ')
room_name = input('Input room name: ')
is_local_node = True if input('노드서버가 로컬이며 Y, 외부 서버이면 N') == "Y" else False

cap = cv2.VideoCapture(sys.argv[1])

faceDetection = service.UltraLightFaceDetecion("models/RFB-320.tflite",conf_threshold=0.98)
coordinateAlignment = service.CoordinateAlignmentModel("models/coor_2d106.tflite")
headPose = service.HeadPoseEstimator("models/head_pose_object_points.npy", cap.get(3), cap.get(4))
irisLocalization = service.IrisLocalizationModel("models/iris_localization.tflite")
emotionDetection = service.EmotionDetection()

QUEUE_BUFFER_SIZE = 1

box_queue = Queue(maxsize=QUEUE_BUFFER_SIZE)
emotion_box_queue = Queue(maxsize=QUEUE_BUFFER_SIZE)
landmark_queue = Queue(maxsize=QUEUE_BUFFER_SIZE)
iris_queue = Queue(maxsize=QUEUE_BUFFER_SIZE)

# 카메라에서 프레임(한장)을 빼내서 얼굴 위치를 찾고 프레임과 박스를 큐에 넣기
def face_detection():
    MAX_FRAME_RATE = 30
    temp_prev_time = 0
    while True:
        time_elapsed = time.time() - temp_prev_time
        if  time_elapsed > 1. / MAX_FRAME_RATE:
            temp_prev_time = time.time()

            start_time = time.time()# Python측 카메라의 타임 스탬프

            # ret 은 boolean 값으로 제대로 프레임을 읽었는지 표현함.
            ret, frame = cap.read()
            if not ret:
                break

            # 전체 화면중에 얼굴이 어디있는지 찾아줌.
            # 얼굴을 감싸는 4각형의 좌표가 face_boxes
            face_boxes, _ = faceDetection.inference(frame)

            if len(face_boxes) != 0:
                box_queue.put((frame, face_boxes, start_time))
                emotion_box_queue.put((frame, face_boxes, start_time))
            else:
                print('얼굴 박스가 잡히지 않음.')
            log_print("얼굴인식:",time.perf_counter() - start_time)

def get_emotion():
    global emotion, emotion_label
    MAX_FRAME_RATE = 30
    prev = 0

    while True:
        time_elapsed = time.time() - prev
        if time_elapsed > 1. / MAX_FRAME_RATE:
            if emotion_box_queue:
                prev = time.time()
                frame, boxes, start_time = emotion_box_queue.get()
                emotion_pred,label =  emotionDetection.get_emotion(frame,boxes)
                emotion = emotion_pred.tolist()
                emotion_label = label
                log_print('감정',emotion_pred,label)
        else:
            emotion_box_queue.get()

# 프레임의 박스안에서  랜드마크 데이터를 얻어냄.
def face_alignment():
    prev_x = None
    prev_y = None
    while True:
        if box_queue:
            landmark_take_time = time.perf_counter()
            frame, boxes,start_time = box_queue.get()
            landmarks = coordinateAlignment.get_landmarks(frame, boxes)
            x, y, w, h = boxes[0]
            mid_x = (x+w)/2
            mid_y = (y+h)/2
            move_x = 0
            move_y = 0

            if prev_x != None: # 첫 프레임이 아니라면
                move_x = prev_x - mid_x
                move_y = prev_y - mid_y

            prev_x, prev_y = mid_x, mid_y
            landmark_queue.put((frame, landmarks,start_time,move_x,move_y))
            log_print("랜드마크:", time.perf_counter() - landmark_take_time)

def iris_localization(YAW_THD=45):
    global user_name,room_name

    sio = socketio.Client()

    server_url =  "https://virtual-chat-aio.herokuapp.com/" if is_local_node else  "http://localhost:3001/"
    sio.connect(server_url)

    for_socket_frequency = time.perf_counter()
    count = 1

    while True:
        frame, landmarks_array, start_time,move_x,move_y = landmark_queue.get()
        log_print("홍채인식 시작")
        for landmarks in landmarks_array:
            log_print("랜드마크 비지 않음")
            a_time = time.perf_counter()

            # calculate head pose
            euler_angle = headPose.get_head_pose(landmarks).flatten()

            pitch, yaw, roll = euler_angle

            eye_starts = landmarks[[35, 89]]
            eye_ends = landmarks[[39, 93]]
            eye_centers = landmarks[[34, 88]]
            eye_lengths = (eye_ends - eye_starts)[:, 0]

            # 동공
            pupils = eye_centers.copy()

            if yaw > -YAW_THD:
                iris_time = time.perf_counter()
                iris_left = irisLocalization.get_mesh(frame, eye_lengths[0], eye_centers[0])
                log_print("홍채TF 시간:", time.perf_counter() - iris_time)
                pupils[0] = iris_left[0]

            if yaw < YAW_THD:
                iris_right = irisLocalization.get_mesh(frame, eye_lengths[1], eye_centers[1])
                pupils[1] = iris_right[0]

            poi = eye_starts, eye_ends, pupils, eye_centers

            theta, pha, _ = irisLocalization.calculate_3d_gaze(poi)

            #  입의 가로 길이 / 세로 길이
            mouth_open_percent = (
                landmarks[60, 1] - landmarks[62, 1]) / (landmarks[53, 1] - landmarks[71, 1])

            #  눈의 가로 길이/ 세로 길이 ( 얼마나 감겼나)
            left_eye_status = (
                landmarks[33, 1] - landmarks[40, 1]) / eye_lengths[0]
            right_eye_status = (
                landmarks[87, 1] - landmarks[94, 1]) / eye_lengths[1]

            result_string = {'euler': (pitch, -yaw, -roll),
                             'eye': (theta.mean(), pha.mean()),
                             'mouth': mouth_open_percent,
                             'blink': (left_eye_status, right_eye_status),
                             'move':(move_x,move_y)
                             }

            log_print("홍채인식:",time.perf_counter() - a_time)

            try:
                data ={'name':user_name,'result_string':result_string,'start_time':int(start_time * 1000),'room':room_name,'emotion_label':emotion_label,'emotion':emotion}
                sio.emit('result_data', data)

                print('프레임   지연 시간: ', (time.time() - start_time))
                print('소켓전송 간격 시간: ', time.perf_counter() - for_socket_frequency)
                print('프레임       Count: ',count)
                count += 1
                for_socket_frequency = time.perf_counter()

            except Exception as e:
                print('❌소켓 전송 에러 ❌: ' ,e)
                pass
            break

emotion_thread = Thread(target=get_emotion)
emotion_thread.start()

iris_thread = Thread(target=iris_localization)
iris_thread.start()

alignment_thread = Thread(target=face_alignment)
alignment_thread.start()

face_detection()

cap.release()
cv2.destroyAllWindows()
