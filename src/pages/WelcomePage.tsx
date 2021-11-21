import { Center } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RoomInput from '../components/Welcome';
const WelcomePage = () => {
  return (
    <Center
      width="100vw"
      height="100vh"
      backgroundColor="#39c5bb"
      flexDir="column"
      //   opacity={0.5}
    >
      <Text fontSize="20em" fontWeight="600">
        Virtual Chat
      </Text>
      <RoomInput></RoomInput>
      <Link to="/a">/a</Link>
    </Center>
  );
};

export default WelcomePage;
