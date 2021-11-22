import { Box, BoxProps, Center } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export const MotionBox = motion<BoxProps>(Box);

const TestPage = () => {
  const constraintsRef = useRef(null);
  return (
    <Center
      width="100vw"
      height="100vh"
      backgroundColor="#39c5bb"
      flexDir="column"
    >
      {/* <MotionBox animate={{ x: 100 }} bgColor="red" /> */}
      <motion.div ref={constraintsRef}>
        <Box width="500px" height="500px" bgColor="red"></Box>
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 0.3,
        }}
        whileHover={{ scale: 5 }}
        whileTap={{ scale: 0.5 }}
        // drag="x"
        drag
        // dragConstraints={{
        //   top: -50,
        //   left: -50,
        //   right: 50,
        //   bottom: 50,
        // }}
        // 아래 처럼 주면 고정, 위에 처럼 주명 재자리
        dragConstraints={constraintsRef}
      >
        <Box
          width="150px"
          height="150px"
          borderRadius="30px"
          bgColor="white"
        ></Box>
      </motion.div>
      aaa
    </Center>
  );
};

export default TestPage;
