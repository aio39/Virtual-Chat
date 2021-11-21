import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { audiosAtom, camerasAtom } from '../lib/recoil/cameraAtom';
import { roomNameAtom, userNameAtom } from '../lib/recoil/shareDataAtom';
import { makeConnection, socket } from '../lib/socket';
import toast from '../lib/toast';

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const audios = devices.filter((device) => device.kind === 'audioinput');
    return [cameras, audios];
  } catch (e) {
    console.log(e);
  }
};

const getMedia = async (deviceId?: string) => {
  console.info('getMedia');
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' }, // 전면 카메라
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    const myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    console.log('myStream', myStream);
    window.myData.myStream = myStream;

    // const myFace = document.getElementById('myFace') as HTMLVideoElement;
    // myFace.srcObject = myStream;

    if (!deviceId) {
      return await getCameras();
    }
  } catch (e) {
    toast({ title: '장치가 확인되지 않습니다.' });
    console.error('at getMedia', e);
  }
};

const RoomInput = () => {
  const [inputRoomName, setInputRoomName] = useRecoilState(roomNameAtom);
  const [inputUserName, setInputUserName] = useRecoilState(userNameAtom);
  const navigate = useNavigate();
  const setCameras = useSetRecoilState(camerasAtom);
  const setAudios = useSetRecoilState(audiosAtom);

  const initCall = async () => {
    const devices = await getMedia();
    if (devices) {
      setCameras(devices[0]);
      setAudios(devices[1]);
      makeConnection();
    }
  };

  const handleWelcomeSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();
    navigate('/select');

    await initCall();
    window.myData.roomName = inputRoomName;
    socket.emit('join_room', inputRoomName);
    console.log('join_room', inputRoomName);
  };

  console.log(inputRoomName, inputUserName);
  return (
    <VStack width={3 / 4} maxWidth="lg" backgroundColor="white" zIndex="100">
      <VStack width="full" spacing={10} px="1rem" py="3rem">
        <Input
          focusBorderColor="pink.400"
          value={inputUserName}
          placeholder="User Name"
          onChange={(a) => setInputUserName(a.target.value)}
        ></Input>
        <Input
          focusBorderColor="pink.400"
          value={inputRoomName}
          placeholder="Room Name"
          onChange={(a) => setInputRoomName(a.target.value)}
        ></Input>
        <Button type="submit" onClick={handleWelcomeSubmit}>
          A Room
        </Button>
      </VStack>
    </VStack>
  );
};

export default RoomInput;
