import { Image } from '@chakra-ui/image';
import { Box, BoxProps, Center, HStack, Text } from '@chakra-ui/layout';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import StartBtn from '../components/StartBtn';
import { avatarAtom } from '../lib/recoil/shareDataAtom';

const MotionBox = motion<BoxProps>(Box);

export const AvatarList = ['miku', 'kizunaai'];

const SelectPage = () => {
  const [selected, setSelected] = useRecoilState(avatarAtom);
  const controls = useAnimation();

  const handleAvatarSelect = async (name: string) => {
    setSelected(name);
    controls.start({
      y: [-100, 0],
      opacity: [0, 1],
      transition: { type: 'spring', duration: 0.1 },
    });
  };

  return (
    <Box position="relative">
      <Center
        flexDir="column"
        width="100vw"
        height="100vh"
        zIndex="10"
        position="absolute"
      >
        <HStack fontSize="3.5em" fontWeight="600">
          <Text>현재 선택 : </Text>
          <motion.span initial={{ y: 0 }} animate={controls}>
            {selected}
          </motion.span>
        </HStack>
        <HStack spacing="6rem" my="3rem">
          {AvatarList.map((name) => (
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.1,
                  delay: 0,
                },
              }}
              whileTap={{
                scale: 0.9,
                transition: {
                  duration: 0.1,
                  delay: 0,
                },
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5, delay: 0.3 }}
              onClick={() => handleAvatarSelect(name)}
              key={name}
            >
              <Image
                className={selected === name ? 'selected' : ''}
                shadow="lg"
                boxSize="300px"
                src={`${
                  process.env.REACT_APP_URL ?? ''
                }/public/image/${name}.jpg`}
                objectFit="cover"
                alt={`Select ${name}`}
                borderRadius="2rem"
                fallbackSrc="https://via.placeholder.com/150"
                sx={{
                  boxShadow:
                    selected === name
                      ? 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'
                      : '',
                }}
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
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        top="0"
        backgroundImage={`url("${
          process.env.REACT_APP_URL ?? ''
        }/public/image/${selected}.jpg")`}
        layout
        backgroundSize="cover"
        zIndex="1"
        opacity="0.3"
        filter="blur(30px) grayscale(20%)"
        initial={{ backgroundColor: 'black' }}
        transition="background-image 0.2s ease-in-out"
      ></Box>
    </Box>
  );
};

export default SelectPage;
