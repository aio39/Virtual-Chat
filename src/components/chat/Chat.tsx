import { Input } from '@chakra-ui/input';
import { Box, VStack } from '@chakra-ui/layout';
import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userNameAtom } from '../../lib/recoil/shareDataAtom';
import { socket } from '../../lib/socket';

const OneChat: FC<{ name: string; message: string }> = ({ name, message }) => {
  const userName = useRecoilValue(userNameAtom);
  return (
    <Box
      backgroundColor="#39c5bb"
      alignSelf={name === userName ? 'start' : 'end'}
      p="2"
      textColor="white"
      rounded="1rem"
    >
      {message}
    </Box>
  );
};

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
        onChange={(a) => {
          setMessage(a.target.value);
        }}
        onKeyDown={enterHandler}
      ></Input>
    </Box>
  );
};

export default MessageChat;
