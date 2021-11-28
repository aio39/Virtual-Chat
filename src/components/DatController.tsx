import { Button } from '@chakra-ui/button';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import DatGui, { DatNumber } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

export type DatGUIData = {
  cameraX: number;
  cameraZ: number;
  cameraY: number;
  meshRotateX: number;
  meshRotateZ: number;
  meshRotateY: number;
};

const initData = {
  cameraX: 0,
  cameraY: -0.2,
  cameraZ: 15,
  meshRotateX: 0,
  meshRotateY: 0,
  meshRotateZ: 0,
};

const DatController: FC<{ name: string; mt?: number }> = ({ name, mt }) => {
  const [data, setData] = useState<DatGUIData>(initData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const handleUpdate = (newData: any) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
    window.myData.renderByGui[name](newData);
  };

  const reset = () => {
    setData(initData);
    window.myData.renderByGui[name](initData);
  };

  return (
    <Box position="fixed" top={mt ? mt * 45 : '0px'} right="0">
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay background="" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>옵션</DrawerHeader>

          <DrawerBody>
            <Box
              sx={{
                '.react-dat-gui': {
                  position: 'relative',
                },
              }}
            >
              <DatGui data={data} onUpdate={handleUpdate}>
                {/* <DatString path="package" label="Package" /> */}
                <DatNumber
                  path="cameraX"
                  label="cameraX"
                  min={-30}
                  max={30}
                  step={0.05}
                />
                <DatNumber
                  path="cameraZ"
                  label="cameraZ"
                  min={-30}
                  max={30}
                  step={0.05}
                />
                <DatNumber
                  path="cameraY"
                  label="cameraY"
                  min={-30}
                  max={30}
                  step={0.05}
                />
                <DatNumber
                  path="meshRotateX"
                  label="meshRotateX"
                  min={-Math.PI}
                  max={Math.PI}
                  step={0.01}
                />
                <DatNumber
                  path="meshRotateY"
                  label="meshRotateY"
                  min={-Math.PI}
                  max={Math.PI}
                  step={0.01}
                />
                <DatNumber
                  path="meshRotateZ"
                  label="meshRotateZ"
                  min={-Math.PI}
                  max={Math.PI}
                  step={0.01}
                />

                {/* <DatBoolean path="isAwesome" label="Awesome?" /> */}
                {/* <DatColor path="feelsLike" label="Feels Like" /> */}
              </DatGui>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button textColor="black" onClick={reset}>
              리셋
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DatController;
