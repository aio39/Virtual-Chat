import { Text, VStack } from '@chakra-ui/layout';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { camerasAtom } from '../lib/recoil/cameraAtom';

const Stream: FC = () => {
  const cameras = useRecoilValue(camerasAtom);
  const currentCamera = window.myStream?.getVideoTracks()[0];

  return (
    <VStack>
      <Text fontSize="lg"> Stream </Text>
      {cameras && (
        <select name="cameras" id="">
          {cameras.map((camera) => {
            return (
              <option
                value={camera.deviceId}
                key={camera.deviceId}
                selected={currentCamera.label === camera.label}
              >
                {camera.label}
              </option>
            );
          })}
        </select>
      )}

      <video id="myFace" autoPlay playsInline width="400" height="400"></video>
      <video
        id="peerFace"
        autoPlay
        playsInline
        width="400"
        height="400"
      ></video>
    </VStack>
  );
};

export default Stream;
