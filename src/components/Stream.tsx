import { Box, HStack, VStack } from '@chakra-ui/layout';
import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getMedia } from '../lib/handleMedia';
import { audiosAtom, camerasAtom } from '../lib/recoil/cameraAtom';

const aWidth = window.innerWidth / 3;

const Stream: FC = () => {
  const cameras = useRecoilValue(camerasAtom);
  const audios = useRecoilValue(audiosAtom);
  const currentCamera = window.myData.myStream.getVideoTracks()[0];
  const currentAudio = window.myData.myStream.getAudioTracks()[0];

  const [audioId, setAudioId] = useState<string>();
  const [videoId, setVideoId] = useState<string>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoPeerRef = useRef<HTMLVideoElement>(null);
  console.log(cameras);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = window.myData.myStream;
    }

    if (audioRef.current) {
      audioRef.current.srcObject = window.myData.myStream;
    }

    if (videoPeerRef.current) {
      videoPeerRef.current.srcObject = window.myData.peerStream;
    }
  }, []);

  const MediaSelector: FC<{
    medias: MediaDeviceInfo[];
    current: MediaStreamTrack;
    type: string;
  }> = ({ medias, current, type }) => {
    return (
      <select
        name="cameras"
        id=""
        onChange={(e) => {
          console.log('key', e.target.value);
          window.myData.myStream.getTracks().forEach((track) => {
            track.stop();
          });
          const key = e.target.value;
          if (type === 'video') {
            getMedia(key, audioId);
            setVideoId(key);
          } else {
            getMedia(videoId, key);
            setAudioId(key);
          }
        }}
      >
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

  return (
    <VStack>
      {/* {audios && (
        <MediaSelector current={currentAudio} medias={audios} type="audio" />
      )}
      {cameras && (
        <MediaSelector current={currentCamera} medias={cameras} type="video" />
      )} */}
      <HStack width="full" px={3}>
        <Box width={aWidth}>
          <video
            ref={videoRef}
            id="myFace"
            autoPlay
            playsInline
            width={aWidth}
            height="400"
            muted
          ></video>
          {/* <audio ref={audioRef} autoPlay controls></audio> */}
        </Box>
        <Box width={aWidth}></Box>
        <Box width={aWidth}>
          <video
            ref={videoPeerRef}
            id="peerFace"
            autoPlay
            playsInline
            width={aWidth}
            height="400"
          ></video>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Stream;
