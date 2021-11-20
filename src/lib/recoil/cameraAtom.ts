import { atom } from 'recoil';

const camerasAtom = atom<MediaDeviceInfo[] | undefined>({
  key: 'cameras', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export { camerasAtom };
