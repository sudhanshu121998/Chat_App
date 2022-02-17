var cameraButton = document.getElementById("cameraButton");
var micButton = document.getElementById("micButton");
var linkSpace = document.getElementById("linkSpace");
var copyStatus = document.getElementById("copiedSuccess");
var chatBox = document.getElementById("liveChat");
var controls = document.getElementById("controls-panel");
var chats = document.getElementById("output");
var chatWindow = document.getElementById("chat-window");

function goBack() {
  window.history.back();
}

function preControls(){
  console.log(videoPrecontrol);
  console.log(audioPrecontrol);
  if(videoPrecontrol == 'false'){
    playPause();
  }
  if(audioPrecontrol == 'false'){
    muteUnmute();
  }
}

function playPause(){
  userStream.getVideoTracks().forEach(function(track){
    if(track.enabled){
      track.enabled = false;
      cameraButton.style.backgroundImage = 'url("/images/videocam_off.png")';
    }
    else{
      track.enabled = true;
      cameraButton.style.backgroundImage = 'url("/images/videocam.png")';
    }
  });
}

function muteUnmute(){
  userStream.getAudioTracks().forEach(function(track){
    if(track.enabled){
      track.enabled = false;
      micButton.style.backgroundImage = 'url("/images/mic_off.png")';
    }
    else{
      track.enabled = true;
      micButton.style.backgroundImage = 'url("/images/mic.png")';
    }
  });
}

function showHideChat(){
  if(chatBox.classList.contains("hidden")){
    chatBox.classList.remove("hidden");
    controls.classList.add("open-chat-controls");
  }
  else{
    chatBox.classList.add("hidden");
    controls.classList.remove("open-chat-controls");
  }
}

function copyLink(){
  navigator.clipboard.writeText(ROOM_ID);
  copyStatus.innerHTML = "Copied!";
}

function clearCopied(){
  copyStatus.innerHTML = "";
}

function addChat(data){
  if(data.username == username){
    chats.innerHTML += '<p class="from-self">'+data.username+'</p><p class="self-message">'+data.message+'</p>';
  }
  else{
    chats.innerHTML += '<p class="chat-from">'+data.username+'</p><p class="chat-message">'+data.message+'</p>';
  }
  updateScroll();
}

function updateScroll(){
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
