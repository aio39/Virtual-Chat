import { Center, HStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import MMDRender from '../components/MMDRender';
import Stream from '../components/Stream';
import {
  avatarAtom,
  roomNameAtom,
  userNameAtom,
} from '../lib/recoil/shareDataAtom';
const ChatPage = () => {
  useEffect(() => {}, []);
  const userName = useRecoilValue(userNameAtom);
  const roomName = useRecoilValue(roomNameAtom);
  const myAvatar = useRecoilValue(avatarAtom);

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
          {userName}
          {roomName}
        </Text>
        {/* <Text fontSize="10em" fontWeight="600">
          {roomName}
        </Text> */}
      </HStack>
      <HStack
        width="100vw"
        height="623px"
        justifyContent="space-around"
        position="relative"
      >
        <MMDRender name={userName} model={myAvatar}></MMDRender>
        <MMDRender name={'peer'} model="kizunaai"></MMDRender>
      </HStack>

      <Stream></Stream>
      <Link to="/select">/select</Link>
    </Center>
  );
};

export default ChatPage;
