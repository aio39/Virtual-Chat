import { Center, HStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MMDRender from '../components/MMDRender';
import Stream from '../components/Stream';
const ChatPage = () => {
  useEffect(() => {}, []);

  return (
    <Center
      width="100vw"
      height="100vh"
      backgroundColor="#39c5bb"
      flexDir="column"
      //   opacity={0.5}
    >
      <Text fontSize="10em" fontWeight="600">
        Chat
      </Text>
      <HStack>
        <MMDRender order={2} model="miku"></MMDRender>
        <MMDRender order={1} model="kizunaai"></MMDRender>
      </HStack>

      <Stream></Stream>
      <Link to="/select">/select</Link>
    </Center>
  );
};

export default ChatPage;
