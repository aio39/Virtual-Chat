import { Box, Center, HStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import MessageChat from '../components/chat/Chat';
import DatController from '../components/DatController';
import LoadingDiv from '../components/LoadingDiv';
import MMDRender from '../components/MMDRender';
import Stream from '../components/Stream';
import {
  avatarAtom,
  peersDataAtom,
  roomNameAtom,
  userNameAtom,
} from '../lib/recoil/shareDataAtom';
import { socket } from '../lib/socket';
const ChatPage = () => {
  const userName = useRecoilValue(userNameAtom);
  const roomName = useRecoilValue(roomNameAtom);
  const myAvatar = useRecoilValue(avatarAtom);
  const [peersData, setPeersData] = useRecoilState(peersDataAtom);

  useEffect(() => {
    const welcomeCB = async (name: string, avatar: string) => {
      window.myData.myDataChannel =
        window.myData.myPeerConnection.createDataChannel('chat');
      window.myData.myDataChannel.addEventListener('message', (event) =>
        console.log(event.data)
      );
      console.log('made data channel');

      setPeersData((prev) => [...prev, { name, avatar }]);

      const offer = await window.myData.myPeerConnection.createOffer();
      window.myData.myPeerConnection.setLocalDescription(offer);

      console.log('sent the offer');
      socket.emit('offer', offer, window.myData.roomName);
    };

    const getPeerListCB = (peerList: any) => {
      setPeersData(peerList);
      console.log('peerList', peerList);
    };

    socket.on('welcome', welcomeCB);
    socket.on('getPeerList', getPeerListCB);

    // NOTE 이 emit 시작버튼에다가 하면 socket 응답 왔을때 다른 이벤트리스너가 등록이 안된 상태가됨.
    socket.emit('join_room', roomName, userName, myAvatar);

    return () => {
      socket.off('welcome', welcomeCB);
      socket.off('getPeerList', getPeerListCB);
    };
  }, [setPeersData, myAvatar, roomName, userName]);
  console.log(peersData);
  return (
    <Center
      width="100vw"
      minHeight="100vh"
      backgroundColor="#292841"
      color="white"
      flexDir="column"
      overflow="scroll"
      //   opacity={0.5}
    >
      <HStack my="2rem">
        <Text fontSize="3em" fontWeight="600">
          Room: {roomName}
        </Text>
      </HStack>
      <HStack
        width="100vw"
        justifyContent="space-around"
        position="relative"
        color="black"
      >
        <MMDRender name={userName} model={myAvatar}></MMDRender>
        <MessageChat />
        {peersData.length === 0 ? (
          <Center
            width={window.innerWidth / 3}
            height={window.innerWidth / 3}
            bgColor="white"
          >
            <LoadingDiv></LoadingDiv>
          </Center>
        ) : (
          peersData
            .filter((data) => data.name !== userName)
            .map((data) => (
              <MMDRender name={data.name} model={data.avatar}></MMDRender>
            ))
        )}
      </HStack>

      <DatController></DatController>

      {window.myData.myStream ? (
        <Stream></Stream>
      ) : (
        <Box> 스트림이 없습니다.</Box>
      )}

      <Link to="/select"></Link>
    </Center>
  );
};

export default ChatPage;
