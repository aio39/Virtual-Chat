import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DatGUIData } from './components/DatController';
import './global.css';
import ChatPage from './pages/ChatPage';
import SelectPage from './pages/SelectPage';
import TestPage from './pages/TestPage';
import WelcomePage from './pages/WelcomePage';

declare global {
  interface Window {
    myData: {
      myPeerConnection: RTCPeerConnection;
      myDataChannel: RTCDataChannel;
      myStream: MediaStream;
      peerStream: MediaStream;
      roomName: string;
      animates: {
        [key: string]: (result: any) => void;
      };
      renderByGui: (data: DatGUIData) => void;
    };
  }
}

// @ts-ignore
window.myData = { animates: {} };

export const App = () => {
  const location = useLocation();

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Box backgroundColor="white">
          <AnimatePresence>
            {/* 바로 하위 항목에만 반응해서 key를 넣어줌. */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/select" element={<SelectPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </AnimatePresence>
        </Box>
      </ChakraProvider>
    </RecoilRoot>
  );
};
