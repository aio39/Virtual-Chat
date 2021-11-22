import { Box, BoxProps, Center } from '@chakra-ui/layout';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const MotionBox = motion<BoxProps>(Box);

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
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  return (
    <Center
      width="100vw"
      height="100vh"
      // backgroundColor="#39c5bb"
      flexDir="column"
    >
      {/* <MotionBox animate={{ x: 100 }} bgColor="red" /> */}
      {/* <motion.div ref={constraintsRef}>
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
      </motion.div> */}
      <svg
        width="675.195"
        height="144.043"
        // viewBox="0 0 675.195 144.043"
      >
        <motion.path
          d="M 76.074 144.043 L 54.004 144.043 L 0 4.004 L 21.484 4.004 L 65.039 119.238 L 108.691 4.004 L 130.078 4.004 L 76.074 144.043 Z M 412.012 124.805 L 412.012 40.039 L 431.152 40.039 L 431.152 124.805 L 484.766 124.805 L 484.766 40.039 L 504.004 40.039 L 504.004 144.043 L 484.766 144.043 L 484.766 126.465 Q 484.473 130.078 482.813 133.301 A 20.134 20.134 0 0 1 478.564 138.916 A 19.644 19.644 0 0 1 472.656 142.676 A 18.285 18.285 0 0 1 465.625 144.043 L 431.152 144.043 A 18.57 18.57 0 0 1 423.73 142.529 A 19.362 19.362 0 0 1 417.627 138.428 A 19.362 19.362 0 0 1 413.525 132.324 Q 412.012 128.809 412.012 124.805 Z M 536.035 124.805 L 536.035 98.633 Q 536.035 94.629 537.549 91.162 A 20.129 20.129 0 0 1 541.65 85.059 Q 544.238 82.422 547.754 80.908 A 18.57 18.57 0 0 1 555.176 79.395 L 604.785 79.395 L 604.785 59.277 L 541.992 59.277 L 541.992 40.039 L 604.785 40.039 A 18.81 18.81 0 0 1 612.305 41.553 A 19.362 19.362 0 0 1 618.408 45.654 A 19.362 19.362 0 0 1 622.51 51.758 Q 624.023 55.273 624.023 59.277 L 624.023 144.043 L 604.785 144.043 L 604.785 126.465 Q 604.492 130.078 602.832 133.301 A 20.134 20.134 0 0 1 598.584 138.916 A 19.644 19.644 0 0 1 592.676 142.676 A 18.285 18.285 0 0 1 585.645 144.043 L 555.176 144.043 A 18.57 18.57 0 0 1 547.754 142.529 A 19.362 19.362 0 0 1 541.65 138.428 A 19.362 19.362 0 0 1 537.549 132.324 Q 536.035 128.809 536.035 124.805 Z M 301.172 59.277 L 301.172 40.039 L 326.563 40.039 L 326.563 8.008 L 345.801 8.008 L 345.801 40.039 L 379.98 40.039 L 379.98 59.277 L 345.801 59.277 L 345.801 124.805 L 379.98 124.805 L 379.98 144.043 L 345.801 144.043 A 18.57 18.57 0 0 1 338.379 142.529 Q 334.863 141.016 332.227 138.428 Q 329.59 135.84 328.076 132.324 Q 326.563 128.809 326.563 124.805 L 326.563 59.277 L 301.172 59.277 Z M 264.063 59.277 L 224.414 59.277 L 224.414 144.043 L 205.273 144.043 L 205.273 40.039 L 224.414 40.039 L 224.414 58.398 A 19.239 19.239 0 0 1 226.172 51.221 Q 227.734 47.852 230.322 45.361 Q 232.91 42.871 236.328 41.455 A 18.915 18.915 0 0 1 243.53 40.039 A 21.496 21.496 0 0 1 243.652 40.039 L 264.063 40.039 Q 268.066 40.039 271.533 41.553 A 20.129 20.129 0 0 1 277.637 45.654 Q 280.273 48.242 281.787 51.758 Q 283.301 55.273 283.301 59.277 L 283.301 76.855 L 264.063 76.855 L 264.063 59.277 Z M 656.055 0 L 675.195 0 L 675.195 144.043 L 656.055 144.043 L 656.055 0 Z M 153.027 40.039 L 172.266 40.039 L 172.266 144.043 L 153.027 144.043 L 153.027 40.039 Z M 555.176 98.633 L 555.176 124.805 L 604.785 124.805 L 604.785 98.633 L 555.176 98.633 Z M 152.051 20.02 L 152.051 0 L 173.242 0 L 173.242 20.02 L 152.051 20.02 Z"
          vector-effect="non-scaling-stroke"
          fill="none"
          strokeWidth="5"
          // stroke="black"
          // strokeDasharray="0 1"
          initial={{ pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: 1 }}
        />
      </svg>
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
