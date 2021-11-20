import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { FormEventHandler, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { camerasAtom } from '../lib/recoil/cameraAtom';
import { makeConnection, socket } from '../lib/socket';

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    return cameras;
  } catch (e) {
    console.log(e);
  }
};

const getMedia = async (deviceId?: string) => {
  console.log('getMedia');
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    window.myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    console.log('myStrema', window.myStream);
    const myFace = document.getElementById('myFace') as HTMLVideoElement;
    myFace.srcObject = window.myStream;
    if (!deviceId) {
      return await getCameras();
    }
  } catch (e) {
    console.error('at getMedia', e);
  }
};

const Welcome = () => {
  const [visible, setVisible] = useState(true);
  const [inputRoomName, setInputRoomName] = useState('');
  const setCameras = useSetRecoilState(camerasAtom);

  const initCall = async () => {
    const cameras = await getMedia();
    console.log(cameras);
    if (cameras) {
      setCameras(cameras);
      makeConnection();
    }
  };

  const handleWelcomeSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();
    await initCall();
    window.roomName = inputRoomName;
    socket.emit('join_room', inputRoomName);
    console.log('join_room', inputRoomName);
    setInputRoomName('');
  };

  return (
    <VStack visibility={visible ? 'visible' : 'hidden'}>
      <form onSubmit={handleWelcomeSubmit}>
        <Input
          value={inputRoomName}
          onChange={(a) => setInputRoomName(a.target.value)}
        ></Input>
        <Button type="submit">A Room</Button>
      </form>
    </VStack>
  );
};

export default Welcome;
