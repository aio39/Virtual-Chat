import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Link,
  Text,
  theme,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Stream from './components/Stream';
import Welcome from './components/Welcome';
import { socket } from './lib/socket';
import { Logo } from './Logo';

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
  useEffect(() => {
    socket.emit('fuck');
    return () => {};
  }, []);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <div id="mmd"></div>
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />
              <Text>
                Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
              </Text>
              <Welcome />
              <Stream></Stream>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    </RecoilRoot>
  );
};
