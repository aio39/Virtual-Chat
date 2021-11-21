import { VStack } from '@chakra-ui/layout';
import { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { audiosAtom, camerasAtom } from '../lib/recoil/cameraAtom';

const MediaSelector: FC<{
  medias: MediaDeviceInfo[];
  current: MediaStreamTrack;
}> = ({ medias, current }) => {
  return (
    <select name="cameras" id="">
      {medias.map((media, idx) => {
        return (
          <option
            value={media.deviceId}
            key={media.deviceId}
            selected={current ? current.label === media.label : idx === 0}
          >
            {media.label}
          </option>
        );
      })}
    </select>
  );
};

const Stream: FC = () => {
  const cameras = useRecoilValue(camerasAtom);
  const audios = useRecoilValue(audiosAtom);
  const currentCamera = window.myData.myStream.getVideoTracks()[0];
  const currentAudio = window.myData.myStream.getAudioTracks()[0];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = window.myData.myStream;
    }
  }, []);

  return (
    <VStack>
      {audios && <MediaSelector current={currentAudio} medias={audios} />}
      {cameras && <MediaSelector current={currentCamera} medias={cameras} />}
      <video
        ref={videoRef}
        id="myFace"
        autoPlay
        playsInline
        width="400"
        height="400"
      ></video>
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
