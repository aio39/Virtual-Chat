import { Input } from '@chakra-ui/input';
import { Box, BoxProps, VStack } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userNameAtom } from '../../lib/recoil/shareDataAtom';
import { socket } from '../../lib/socket';

const MotionBox = motion<BoxProps>(Box);

const OneChat: FC<{ name: string; message: string }> = memo(
  ({ name, message }) => {
    const userName = useRecoilValue(userNameAtom);
    const isMyMessage = name === userName;
    const repair = isMyMessage ? -1 : 1;
    return (
      <MotionBox
        backgroundColor="#39c5bb"
        alignSelf={isMyMessage ? 'start' : 'end'}
        p="2"
        textColor="white"
        rounded="1rem"
        initial={{ x: 300 * repair }}
        animate={{ x: 0 }}
        maxW="100%"
        display="inline-block"
        overflowWrap="break-word"
      >
        {message}
      </MotionBox>
    );
  }
);

const MessageChat = () => {
  const userName = useRecoilValue(userNameAtom);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<[string, string][]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getChatMessageCB = (name: string, message: string) => {
      setMessages((prev) => [...prev, [name, message]]);
    };

    socket.on('getChatMessage', getChatMessageCB);

    return () => {
      socket.off('getChatMessage', getChatMessageCB);
    };
  }, []);

  const enterHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      socket.emit('sendMessage', message);
      setMessages((prev) => [...prev, [userName, message]]);
      setMessage('');

      setTimeout(() => {
        if (dummyRef.current) {
          dummyRef.current.scrollTop =
            dummyRef.current.scrollHeight + dummyRef.current.clientHeight;
        } // NOTE 차일드 노드 확장이 비동기므로 setTimeout으로
      }, 0);
    }
  };

  return (
    <Box backgroundColor="white">
      <VStack
        width="30vw"
        height="50vh"
        overflow="scroll"
        ref={dummyRef}
        px="2"
      >
        {messages.map((data, idx) => (
          <OneChat key={idx} name={data[0]} message={data[1]} />
        ))}
      </VStack>
      <Input
        type="text"
        placeholder="type your message"
        value={message}
        color="black"
        onChange={(a) => {
          setMessage(a.target.value);
        }}
        onKeyDown={enterHandler}
      ></Input>
    </Box>
  );
};

export default MessageChat;
