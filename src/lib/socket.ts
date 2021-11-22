import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_URL as string, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log(socket.id);
  console.log(socket.connected);
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});

socket.emit('init', () => {
  console.log('init!');
});

// MMD

let recentTime = Date.now();

socket.on('result_download', (name, result, videoTimeStamp) => {
  const now = Date.now();
  console.log('지연시간', now - videoTimeStamp, result);
  if (window.myData.animates[name]) {
    requestAnimationFrame(() => window.myData.animates[name](result));
  } else {
    console.info('같은 이름의 사용자가 없습니다.');
  }
});

// WebRTC

socket.on('offer', async (offer) => {
  window.myData.myPeerConnection.addEventListener('datachannel', (event) => {
    window.myData.myDataChannel = event.channel;
    window.myData.myDataChannel.addEventListener('message', (event) =>
      console.log(event.data)
    );
  });
  console.log('received the offer');
  window.myData.myPeerConnection.setRemoteDescription(offer);
  const answer = await window.myData.myPeerConnection.createAnswer();
  window.myData.myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, window.myData.roomName);
  console.log('sent the answer');
});

socket.on('answer', (answer) => {
  console.log('received the answer');
  window.myData.myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  console.log('received candidate');
  window.myData.myPeerConnection.addIceCandidate(ice);
});

export function makeConnection() {
  window.myData.myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  });

  console.log(window.myData.myPeerConnection);

  window.myData.myPeerConnection.addEventListener('icecandidate', handleIce);
  window.myData.myPeerConnection.addEventListener('addstream', handleAddStream);
  window.myData.myStream
    .getTracks()
    .forEach((track) =>
      window.myData.myPeerConnection.addTrack(track, window.myData.myStream)
    );
}

function handleIce(data: RTCPeerConnectionIceEvent) {
  console.log('sent candidate');
  socket.emit('ice', data.candidate, window.myData.roomName);
}

const handleAddStream: EventListenerOrEventListenerObject = (data: any) => {
  const peerFace = document.getElementById('peerFace') as HTMLVideoElement;
  window.myData.peerStream = data.stream;
  // peerFace.srcObject = data.stream;
};

export { socket };
