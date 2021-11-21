import { ChakraProvider, theme } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import SelectPage from './pages/SelectPage';
import WelcomePage from './pages/WelcomePage';

declare global {
  interface Window {
    myPeerConnection: RTCPeerConnection;
    myDataChannel: RTCDataChannel;
    myStream: MediaStream;
    roomName: string;
    animate: (result: any) => void;
  }
}

export const App = () => {
  const location = useLocation();

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/a" element={<SelectPage />} />
          </Routes>
        </AnimatePresence>
      </ChakraProvider>
    </RecoilRoot>
  );
};
