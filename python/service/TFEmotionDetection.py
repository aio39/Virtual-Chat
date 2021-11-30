import cv2.cv2
import numpy as np
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
import os
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
EMOTIONS = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}


class EmotionDetection():
    def __init__(self):
        model = Sequential()
        model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48, 48, 1)))
        model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Dropout(0.25))

        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Dropout(0.25))

        model.add(Flatten())
        model.add(Dense(1024, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(7, activation='softmax'))
        model.load_weights('./models/model.h5')

        self.model = model

    def _preprocessing(self,frame,boxs):
        x,y,w,h = map(int, boxs[0])
        crop = frame[y: h, x: w]
        gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

        resize = np.expand_dims(np.expand_dims(cv2.resize(gray, (48, 48)), -1), 0)

        return resize

    def get_emotion(self,frame,boxs):
        preprocessed = self._preprocessing(frame,boxs)
        prediction = self.model.predict(preprocessed)[0]
        label = EMOTIONS[prediction.argmax()]
        return prediction,label


# angry, disgusted, fearful, happy, neutral, sad and surprised