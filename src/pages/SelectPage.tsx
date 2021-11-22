import { Image } from '@chakra-ui/image';
import { Box, Center, HStack, Text } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import StartBtn from '../components/StartBtn';
import { avatarAtom } from '../lib/recoil/shareDataAtom';

const AvatarList = ['miku', 'kizunaai'];
const SelectPage = () => {
  const [selected, setSelected] = useRecoilState(avatarAtom);

  return (
    <Center flexDir="column" width="100vw" height="100vh">
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        backgroundImage={`url("${process.env.REACT_APP_URL}/public/image/${selected}.jpg")`}
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
            key={name}
          >
            <Image
              border={selected === name ? '6px' : '1px'}
              borderColor="green"
              shadow="lg"
              boxSize="300px"
              src={`${
                process.env.REACT_APP_URL as string
              }/public/image/${name}.jpg`}
              objectFit="cover"
              alt={`Select ${name}`}
              borderRadius="2rem"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </motion.div>
        ))}
      </HStack>
      <StartBtn />
      <Link to="/">
        <Text fontSize="1em" fontWeight="600">
          뒤로가기
        </Text>
      </Link>
    </Center>
  );
};

export default SelectPage;
