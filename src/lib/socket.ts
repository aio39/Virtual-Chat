import { io } from 'socket.io-client';

const socket = io('localhost:3001');

// Welcome Form (join a room)

// Socket

socket.emit('init', () => {
  console.log('init!');
});

socket.on('welcome', async () => {
  window.myDataChannel = window.myPeerConnection.createDataChannel('chat');
  window.myDataChannel.addEventListener('message', (event) =>
    console.log(event.data)
  );
  console.log('made data channel');
  const offer = await window.myPeerConnection.createOffer();
  window.myPeerConnection.setLocalDescription(offer);
  console.log('sent the offer');
  socket.emit('offer', offer, window.roomName);
});

socket.on('offer', async (offer) => {
  window.myPeerConnection.addEventListener('datachannel', (event) => {
    window.myDataChannel = event.channel;
    window.myDataChannel.addEventListener('message', (event) =>
      console.log(event.data)
    );
  });
  console.log('received the offer');
  window.myPeerConnection.setRemoteDescription(offer);
  const answer = await window.myPeerConnection.createAnswer();
  window.myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, window.roomName);
  console.log('sent the answer');
});

socket.on('answer', (answer) => {
  console.log('received the answer');
  window.myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  console.log('received candidate');
  window.myPeerConnection.addIceCandidate(ice);
});

//  RTC

export function makeConnection() {
  window.myPeerConnection = new RTCPeerConnection({
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
  window.myPeerConnection.addEventListener('icecandidate', handleIce);
  window.myPeerConnection.addEventListener('addstream', handleAddStream);
  window.myStream
    .getTracks()
    .forEach((track) =>
      window.myPeerConnection.addTrack(track, window.myStream)
    );
}

function handleIce(data: RTCPeerConnectionIceEvent) {
  console.log('sent candidate');
  socket.emit('ice', data.candidate, window.roomName);
}

const handleAddStream: EventListenerOrEventListenerObject = (data: any) => {
  const peerFace = document.getElementById('peerFace') as HTMLVideoElement;
  peerFace.srcObject = data.stream;
};

export { socket };
