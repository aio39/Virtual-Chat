import { Button } from '@chakra-ui/button';
import React, { useState } from 'react';
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
  cameraY: 0,
  cameraZ: 16,
  meshRotateX: 0,
  meshRotateY: 0,
  meshRotateZ: 0,
};

const DatController = () => {
  //   const userName = useRecoilValue(userNameAtom);

  const [data, setData] = useState<DatGUIData>(initData);

  const handleUpdate = (newData: any) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
    window.myData.renderByGui(newData);
  };

  const reset = () => {
    setData(initData);
    window.myData.renderByGui(initData);
  };

  return (
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
        min={-360}
        max={360}
        step={0.1}
      />
      <DatNumber
        path="meshRotateY"
        label="meshRotateY"
        min={-360}
        max={360}
        step={0.1}
      />
      <DatNumber
        path="meshRotateZ"
        label="meshRotateZ"
        min={-360}
        max={360}
        step={0.1}
      />
      <Button textColor="black" size="sm" onClick={reset}>
        리셋
      </Button>
      {/* <DatBoolean path="isAwesome" label="Awesome?" /> */}
      {/* <DatColor path="feelsLike" label="Feels Like" /> */}
    </DatGui>
  );
};

export default DatController;
