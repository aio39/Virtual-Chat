import { atom } from 'recoil';

const generateRandomName = (size: number = 5) => {
  return Math.random()
    .toString(36)
    .substr(1, size + 1);
};

const roomNameAtom = atom<string>({
  key: 'roomName',
  default: generateRandomName(5),
});

const userNameAtom = atom<string>({
  key: 'userName',
  default: generateRandomName(5),
});

const avatarAtom = atom<string>({
  key: 'avatar',
  default: 'miku',
});

const peersDataAtom = atom<{ name: string; avatar: string }[]>({
  key: 'peerData',
  default: [],
});

export { roomNameAtom, userNameAtom, avatarAtom, peersDataAtom };
