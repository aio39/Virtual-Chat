import { Box, BoxProps, Center } from '@chakra-ui/layout';
import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

export const MotionBox = motion<BoxProps>(Box);

// {
//   /* <MotionBox animate={{ x: 100 }} bgColor="red" /> */
// }
// {
//   /* <motion.div ref={constraintsRef}>
//         <Box width="500px" height="500px" bgColor="red"></Box>
//       </motion.div>
//       <motion.div
//         animate={{
//           scale: [1, 2, 2, 1, 1],
//           rotate: [0, 0, 270, 270, 0],
//           borderRadius: ['20%', '20%', '50%', '50%', '20%'],
//         }}
//         transition={{
//           duration: 2,
//           ease: 'easeInOut',
//           times: [0, 0.2, 0.5, 0.8, 1],
//           repeat: Infinity,
//           repeatDelay: 0.3,
//         }}
//         whileHover={{ scale: 5 }}
//         whileTap={{ scale: 0.5 }}
//         // drag="x"
//         drag
//         // dragConstraints={{
//         //   top: -50,
//         //   left: -50,
//         //   right: 50,
//         //   bottom: 50,
//         // }}
//         // 아래 처럼 주면 고정, 위에 처럼 주명 재자리
//         dragConstraints={constraintsRef}
//       >
//         <Box
//           width="150px"
//           height="150px"
//           borderRadius="30px"
//           bgColor="white"
//         ></Box>
//       </motion.div> */
// }

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 10,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const TestPage = () => {
  const constraintsRef = useRef(null);
  // const x = useMotionValue(0);
  // const yRange = useTransform(x, [0, 0.9], [0, 1]);
  // const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  const pathLength = useMotionValue(0);
  return (
    <Center
      width="100vw"
      height="100vh"
      // backgroundColor="#39c5bb"
      flexDir="column"
    >
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#ff0055"
          variants={draw}
          custom={1}
          fill="transparent"
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="30"
          rx="20"
          stroke="#0099ff"
          variants={draw}
          custom={3}
        />
        <motion.circle
          cx="100"
          cy="300"
          r="80"
          stroke="#0099ff"
          variants={draw}
          custom={2}
        />
      </motion.svg>
      aaa
    </Center>
  );
};

export default TestPage;
