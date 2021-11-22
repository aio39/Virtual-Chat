import toast from '../lib/toast';

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const audios = devices.filter((device) => device.kind === 'audioinput');
    return [cameras, audios];
  } catch (e) {
    console.log(e);
  }
};

const getMedia = async (videoDeviceId?: string, audioDeviceId?: string) => {
  //  myStream에 선택된 device를 넣는다.
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' }, // 전면 카메라
  };

  console.log('id', videoDeviceId);
  const cameraConstraints = {
    // audio: { deviceId: { exact: audioDeviceId } },
    // audio: true,
    video: { deviceId: { exact: videoDeviceId } },
    // video: true,
  };
  try {
    const myStream = await navigator.mediaDevices.getUserMedia(
      videoDeviceId || audioDeviceId ? cameraConstraints : initialConstrains
    );
    console.log('myStream', myStream);
    window.myData.myStream = myStream;

    if (!videoDeviceId && !audioDeviceId) {
      return await getCameras();
    }
  } catch (e) {
    toast({ title: '장치가 확인되지 않습니다.' });
    console.error('at getMedia');
    console.error(e);
    console.error(cameraConstraints);
  }
};

export { getCameras, getMedia };
