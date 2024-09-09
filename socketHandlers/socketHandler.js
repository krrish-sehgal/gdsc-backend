const topics = {};
const jwt = require("jsonwebtoken");
module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        socket.user = user; // Attach user data to socket
        next();
      } catch (err) {
        return next(new Error("Authentication error"));
      }
    } else {
      next(new Error("Authentication error"));
    }
  });

  // Handle socket connection
  io.on("connection", (socket) => {
    // Subscribe to a topic
    socket.on("subscribe", (topic) => {
      if (!topics[topic]) {
        topics[topic] = [];
      }
      topics[topic].push(socket);
      socket.join(topic); // Join the room for broadcasting
      socket.emit("message", `Subscribed to topic ${topic}`);
    });

    // Publish a message to a topic
    socket.on("publish", (data) => {
      const { topic, message } = data;
      if (!topics[topic]) {
        socket.emit("message", `No subscribers for topic ${topic}`);
      } else {
        // Emit message to all clients subscribed to the topic (Socket.IO "rooms")
        io.to(topic).emit("message", { topic, message });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Clean up topics for the disconnected socket
      for (let topic in topics) {
        topics[topic] = topics[topic].filter((client) => client !== socket);
      }
    });
  });
};
