const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let connectedUsers = [];

io.on("connection", (socket) => {
  let role;
  if (connectedUsers.length === 0) {
    role = "boy";
    connectedUsers.push({ id: socket.id, role: "boy" });
  } else if (connectedUsers.length === 1) {
    role = "girl";
    connectedUsers.push({ id: socket.id, role: "girl" });
  } else {
    socket.emit("roomFull", {
      message: "Chat room is full. Only 2 users allowed.",
    });
    socket.disconnect();
    return;
  }

  socket.emit("assignRole", role);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("foodOrder", (data) => {
    io.emit("foodOrder", data);
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
