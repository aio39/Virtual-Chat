import { Center } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

const LoadingDiv = () => {
  return (
    <Center backgroundColor="black" width="full" height="full">
      <motion.div
        className="lds-roller"
        initial={{ scale: 0 }}
        animate={{ scale: 3.0 }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </motion.div>
    </Center>
  );
};

export default LoadingDiv;
