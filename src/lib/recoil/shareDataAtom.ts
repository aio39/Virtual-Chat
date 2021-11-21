import { atom } from 'recoil';

const generateRandomName = (size: number = 5) => {
  return Math.random()
    .toString(36)
    .substr(1, size + 1);
};

const roomName = atom<string>({
  key: 'roomName',
  default: generateRandomName(5),
});

const userName = atom<string>({
  key: 'userName',
  default: generateRandomName(5),
});

const avatar = atom<string>({
  key: 'avatar',
  default: 'miku',
});

export { roomName, userName, avatar };
