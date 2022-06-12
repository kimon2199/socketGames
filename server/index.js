const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

const boards = new Map();
const arrayAnd = (a, b) => a.map((k, i) => k && b[i]);

const makeRoomId = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

io.on('connection', (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("create_room", () => {
    let room = makeRoomId(4);
    console.log("create_room:",room);
    socket.join(room);
    socket.emit("receive_created_room",{room});
    console.log(io.rooms)
    console.log(io.of("/").adapter.rooms)
  });
  socket.on("join_room", (data) => {
    console.log("join_room (attempting to join):",data.room);
    if (io.of("/").adapter.rooms.has(data.room)){
      socket.join(data.room);
      console.log("join_room (just joined):",data.room);
      socket.emit("receive_join_room_confirmation",data.room);
      console.log(io.of("/").adapter.rooms)
      boards.set(data.room,new Array(15).fill(true));
      socket.to(data.room).emit("start_game", { playerName: "Player One", otherPlayer: "Player Two", turn: true, activs: boards.get(data.room)}); // not sure if
      socket.emit("start_game", { playerName: "Player Two", otherPlayer: "Player One", turn: false, activs: boards.get(data.room)});               // this is right
    }
    else {
      socket.emit("receive_join_room_confirmation",false);
    }
  });
  socket.on('make_move', (data) => {
    let board  = boards.get(data.room);
    boards.set(data.room, arrayAnd(board, data.toRem));
    socket.to(data.room).emit("move_done", { turn: true, activs: boards.get(data.room)}); // not sure if
    socket.emit("move_done", { turn: false, activs: boards.get(data.room)});               // this is right

  })
  socket.on('restart_game', (data) => {
    boards.set(data.room,new Array(15).fill(true));
    socket.to(data.room).emit("restart_game", { playerName: "Player One", otherPlayer: "Player Two", turn: true, activs: boards.get(data.room)}); // not sure if
    socket.emit("restart_game", { playerName: "Player Two", otherPlayer: "Player One", turn: false, activs: boards.get(data.room)});               // this is right
  })
  socket.on('disconnect', () => console.log("k"))
  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });
})

server.listen(3001, () => {
    console.log("Server running...");
})