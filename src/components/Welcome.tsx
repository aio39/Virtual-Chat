import { Button, ButtonProps } from '@chakra-ui/button';
import {
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { StackProps, VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getMedia } from '../lib/handleMedia';
import { audiosAtom, camerasAtom } from '../lib/recoil/cameraAtom';
import { roomNameAtom, userNameAtom } from '../lib/recoil/shareDataAtom';
import { CMButton } from './chakraFactory';

const MotionFormControl = motion<FormControlProps>(FormControl);
const MotionVStack = motion<StackProps>(VStack);
const MotionButton = motion<ButtonProps>(Button);

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
    <MotionVStack
      width={3 / 4}
      maxWidth="lg"
      backgroundColor="white"
      zIndex="100"
      shadow="md"
      px="1rem"
      py="3rem"
      spacing={10}
      initial={{ y: '-50vh', scale: 0.5 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ type: 'spring' }}
      rounded="1rem"
      sx={{ zIndex: 1 }}
      borderColor="black"
      borderWidth="4px"
    >
      <MotionFormControl
        isRequired
        animate={{ y: [-50, 0] }}
        transition={{ type: 'spring', duration: '0.5' }}
      >
        <FormLabel fontSize="1.2rem">유저 이름</FormLabel>
        <Input
          focusBorderColor="pink.400"
          value={inputUserName}
          placeholder="User Name"
          onChange={(a) => {
            setInputUserName(a.target.value);
            window.myData.myName = a.target.value;
          }}
          autoFocus
        ></Input>
      </MotionFormControl>

      <MotionFormControl
        isRequired
        animate={{ y: [-50, 0] }}
        transition={{ type: 'spring', duration: '0.5' }}
      >
        <FormLabel fontSize="1.2rem">방 번호</FormLabel>
        <Input
          focusBorderColor="pink.400"
          value={inputRoomName}
          placeholder="Room Name"
          onChange={(a) => setInputRoomName(a.target.value)}
        ></Input>
      </MotionFormControl>

      <CMButton
        type="submit"
        onClick={handleWelcomeSubmit}
        bgColor="black"
        color="white"
        size="lg"
        animate={{ y: [-50, 0] }}
        transition={{ type: 'spring', duration: '0.5' }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.05, type: 'spring' },
        }}
      >
        Start
      </CMButton>
    </MotionVStack>
  );
};

export default RoomInput;
