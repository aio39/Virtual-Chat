import { Link } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import {
  avatarAtom,
  roomNameAtom,
  userNameAtom,
} from '../lib/recoil/shareDataAtom';
import { makeConnection } from '../lib/socket';

const StartBtn = () => {
  const userName = useRecoilValue(userNameAtom);
  const roomName = useRecoilValue(roomNameAtom);
  const myAvatar = useRecoilValue(avatarAtom);
  const navigate = useNavigate();
  const handleStart = () => {
    makeConnection();
    navigate('/chat');
  };

  return (
    <Link to="/chat">
      <Button
        size="lg"
        colorScheme="teal"
        variant="solid"
        onClick={handleStart}
      >
        Start
      </Button>
    </Link>
  );
};

export default StartBtn;
