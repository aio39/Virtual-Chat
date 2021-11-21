import { Box, Center } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import RoomInput from '../components/Welcome';
const WelcomePage = () => {
  return (
    <Center
      width="100vw"
      height="100vh"
      backgroundColor="#39c5bb"
      flexDir="column"
      //   opacity={0.5}
    >
      <RoomInput></RoomInput>
      <Box position="absolute" zIndex="-100">
        <Text fontSize="25em" lineHeight="22rem" fontWeight="600">
          Virtual Chat
        </Text>
      </Box>
    </Center>
  );
};

export default WelcomePage;
