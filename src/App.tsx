import { ChakraProvider, theme } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DatGUIData } from './components/DatController';
import ChatPage from './pages/ChatPage';
import SelectPage from './pages/SelectPage';
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
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </AnimatePresence>
      </ChakraProvider>
    </RecoilRoot>
  );
};
