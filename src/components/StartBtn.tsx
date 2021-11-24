import { Link } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import {
  avatarAtom,
  roomNameAtom,
  userNameAtom,
} from '../lib/recoil/shareDataAtom';
import { makeConnection } from '../lib/socket';
import { CMButton } from './chakraFactory';

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
      <CMButton onClick={handleStart}>Start</CMButton>
    </Link>
  );
};

export default StartBtn;
