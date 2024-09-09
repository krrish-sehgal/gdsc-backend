let socket;
let token;

// Connect to WebSocket server with token
function connectSocket() {
  token = document.getElementById("token").value;
  if (!token) {
    alert("Please enter a valid JWT token");
    return;
  }

  // Initialize socket connection
  socket = io("http://127.0.0.1:3000", {
    auth: { token },
    transports: ["websocket"], // Ensure WebSocket is the transport used
  });

  // Handle connection events
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
    displayMessage("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    displayMessage("Disconnected from server");
  });

  // Handle incoming messages from server
  socket.on("message", (data) => {
    console.log("Message from server:", data);
    displayMessage(data.message);
  });

  // Handle connection errors
  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
    displayMessage("Connection error: " + err.message);
  });
}

// Subscribe to a topic
function subscribeToTopic() {
  const topic = document.getElementById("topic").value;
  if (socket && topic) {
    socket.emit("subscribe", topic);
    displayMessage(`Subscribed to topic: ${topic}`);
  } else {
    alert("Please connect to the server and enter a topic to subscribe");
  }
}

// Publish a message to a topic
function publishMessage() {
  const topic = document.getElementById("publish-topic").value;
  const message = document.getElementById("message").value;
  if (socket && topic && message) {
    socket.emit("publish", { topic, message });
    displayMessage(`Published message: "${message}" to topic: ${topic}`);
  } else {
    alert("Please connect to the server and enter both a topic and a message");
  }
}

// Display message in the messages div
function displayMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const newMessage = document.createElement("p");
  newMessage.textContent = msg;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to latest message
}

// Connect to the WebSocket server on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("token").addEventListener("input", connectSocket);
});
