import { Link } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { makeConnection } from '../lib/socket';
import { CMButton } from './chakraFactory';

const StartBtn = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    makeConnection();
    navigate('/chat');
  };

  return (
    <Link to="/chat">
      <CMButton
        onClick={handleStart}
        size="lg"
        whileHover={{ scale: 1.2 }}
        mb="4"
      >
        Start
      </CMButton>
    </Link>
  );
};

export default StartBtn;
