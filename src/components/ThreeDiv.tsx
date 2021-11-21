import { Box, Grid, VStack } from '@chakra-ui/layout';
import { Stream } from 'stream';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import MMDRender from './MMDRender';
import RoomInput from './Welcome';

const ThreeDiv = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <div id="mmd"></div>
      <MMDRender></MMDRender>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <RoomInput />
          <Stream></Stream>
        </VStack>
      </Grid>
    </Box>
  );
};
