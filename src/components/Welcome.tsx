import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getMedia } from '../lib/handleMedia';
import { audiosAtom, camerasAtom } from '../lib/recoil/cameraAtom';
import { roomNameAtom, userNameAtom } from '../lib/recoil/shareDataAtom';

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
      navigate('/select');
    }
  };

  const handleWelcomeSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();
    await initCall();
    window.myData.roomName = inputRoomName;
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
