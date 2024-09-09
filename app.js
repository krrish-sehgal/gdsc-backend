const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const socketIo = require("socket.io");
const fileRoutes = require("./routes/file");
const socketHandlers = require("./socketHandlers/socketHandler");
const http = require("http");
dotenv.config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });

app.use("/auth", authRoutes);
app.use("/", express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve the uploaded files statically

// Protect routes using authMiddleware and use file routes
app.use("/files", fileRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for demo; restrict this in production
    methods: ["GET", "POST"],
  },
});

socketHandlers(io);

server.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
