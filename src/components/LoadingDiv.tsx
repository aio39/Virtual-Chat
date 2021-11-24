import { Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const LoadingDiv = () => {
  return (
    <motion.div
      style={{ width: 100, height: 100 }}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <Box flexGrow=""></Box>
      <motion.span
        style={{ width: 20, height: 20, backgroundColor: 'red' }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={{ width: 20, height: 20, backgroundColor: 'red' }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={{ width: 20, height: 20, backgroundColor: 'red' }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default LoadingDiv;
