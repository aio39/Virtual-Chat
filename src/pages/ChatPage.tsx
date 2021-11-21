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
      minHeight="100vh"
      backgroundColor="#39c5bb"
      flexDir="column"
      overflow="scroll"
      //   opacity={0.5}
    >
      <HStack>
        <Text fontSize="10em" fontWeight="600">
          Chat111
        </Text>
      </HStack>
      <HStack
        width="100vw"
        height="623px"
        justifyContent="space-around"
        position="relative"
      >
        <MMDRender order={2} model="miku"></MMDRender>
        <MMDRender order={1} model="kizunaai"></MMDRender>
      </HStack>

      <Stream></Stream>
      <Link to="/select">/select</Link>
    </Center>
  );
};

export default ChatPage;
