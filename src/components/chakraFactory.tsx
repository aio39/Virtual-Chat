import { Button, ButtonProps } from '@chakra-ui/button';
import { chakra } from '@chakra-ui/system';
import { motion } from 'framer-motion';

const CMButton = motion<ButtonProps>(
  chakra(Button, {
    baseStyle: {
      bg: 'black',
      color: 'white',
      size: 'lg',
      _hover: {
        bgColor: '#39c5bb',
      },
    },
  })
);

export { CMButton };
