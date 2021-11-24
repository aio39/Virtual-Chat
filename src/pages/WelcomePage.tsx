import { Box, Center } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import LogoSVG from '../components/LogoSVG';
import RoomInput from '../components/Welcome';
const WelcomePage = () => {
  return (
    <motion.div
      initial="start"
      animate="finish"
      exit={{ y: 2000 }}
      transition={{ duration: 0.3, delayChildren: 1 }}
      variants={{
        start: { y: 0 },
        finish: { y: 0 },
      }}
      style={{ backgroundColor: 'black' }}
    >
      <Center width="100vw" height="100vh" flexDir="column">
        <RoomInput></RoomInput>
      </Center>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="0"
        // mixBlendMode="difference"
        color="white"
      >
        <LogoSVG></LogoSVG>
      </Box>
    </motion.div>
  );
};

export default WelcomePage;
