const socket = io('/')
const videoGrid = document.getElementById('video-grid');
var userStream;
const myPeer = new Peer(undefined, {
  host:'peerjs-server.herokuapp.com',
  secure:true,
  port:443
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    console.log(userId);
    connectToNewUser(userId, stream)
  })
})

socket.on('broadcastMessage', function(data){
  console.log(data.message);
  addChat(data);
});

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  userStream = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

function emitMessage(){
  socket.emit('sendingMessage', {
    'message': messageInput.value,
    'username': username
  }, ROOM_ID);
  message.value='';
}
