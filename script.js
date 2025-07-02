const socket = new WebSocket('wss://ogkp3ebx0m.execute-api.ap-south-1.amazonaws.com/production/');

socket.addEventListener('open', () => {
  console.log('✅ Connected to WebSocket');
});

socket.addEventListener('message', (event) => {
  const msg = event.data;
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('messages').appendChild(li);
  autoScroll();
});

socket.addEventListener('close', () => {
  console.log('❌ WebSocket connection closed');
});

socket.addEventListener('error', (error) => {
  console.error('⚠️ WebSocket error:', error);
});

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message) return;

  socket.send(JSON.stringify({
    action: "sendMessage",
    message: message
  }));

  input.value = '';
}

function autoScroll() {
  const container = document.getElementById('messages');
  container.scrollTop = container.scrollHeight;
}
