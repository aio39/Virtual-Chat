import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Center, HStack, Text } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { avatar } from '../lib/recoil/shareDataAtom';

const AvatarList = ['miku', 'kizunaai'];
const SelectPage = () => {
  const [selected, setSelected] = useRecoilState(avatar);

  return (
    <Center flexDir="column" width="100vw" height="100vh">
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        backgroundImage={`url("http://localhost:3001/public/image/${selected}.jpg")`}
        backgroundSize="cover"
        zIndex="-1"
        opacity="0.5"
        filter="blur(30px) grayscale(20%)"
        transition="background-image 0.2s ease-in-out"
      ></Box>
      <Text fontSize="6em" fontWeight="600">
        Pick
      </Text>
      <HStack spacing="6rem" my="3rem">
        {AvatarList.map((name) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelected(name)}
          >
            <Image
              border={selected === name ? '6px' : '1px'}
              borderColor="green"
              shadow="lg"
              boxSize="300px"
              src={`http://localhost:3001/public/image/${name}.jpg`}
              objectFit="cover"
              alt={`Select ${name}`}
              borderRadius="2rem"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </motion.div>
        ))}
      </HStack>
      <Link to="/chat">
        <Button size="lg" colorScheme="teal" variant="solid">
          Start
        </Button>
      </Link>

      <Link to="/">
        <Text fontSize="1em" fontWeight="600">
          뒤로가기
        </Text>
      </Link>
    </Center>
  );
};

export default SelectPage;
