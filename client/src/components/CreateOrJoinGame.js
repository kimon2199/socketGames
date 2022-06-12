import { useState, useEffect } from 'react';

const CreateOrJoinGame = ({ socket, setRoom }) => {

  const [roomToJoin, setRoomToJoin] = useState('');
  const [roomAttemptedJoin, setRoomAttemptedJoin] = useState('');
  const [nonexistentRoom, setNonexistentRoom] = useState(false);

  const createRoom = () => {
    socket.emit("create_room");
  }

  const joinRoom = () => {
    setRoomAttemptedJoin(roomToJoin);
    socket.emit("join_room", { room: roomToJoin });
  }

  const resetRoomJoin = () => {
    setRoomToJoin('');
    setNonexistentRoom(false);
    setRoomAttemptedJoin('');
  }

  useEffect(() => {
    socket.on("receive_created_room", (data) => {
      console.log(1)
      console.log(data)
      setRoom(data.room);
      console.log(2)
      resetRoomJoin();
      console.log(3)
    })
    return () => socket.off("receive_created_room");
  },[socket])

  useEffect(() => {
    socket.on("receive_join_room_confirmation", (data) => {
      console.log("receive_join_room_confirmation")
      if (data){
        console.log("abot to set room:",data)
        setRoom(data);
        resetRoomJoin();
      }
      else {
        setNonexistentRoom(true);
      }
    })
    return () => socket.off("receive_join_room_confirmation");
  },[socket])

  return(
    <div>
      <button className={"text-white font-bold py-2 px-4 border rounded bg-green-500"}
        onClick={() => createRoom()}>
        {"Create Game"}
      </button>
        <button className={"text-white font-bold py-2 px-4 border rounded bg-green-500"}
        onClick={() => joinRoom()}>
        {"Join Room"}
      </button>
      <input onChange={e => setRoomToJoin(e.target.value)}></input>
      {roomToJoin}
      {nonexistentRoom && <div className={"text-white font-bold py-2 px-4 border rounded bg-red-500"}>
        {"Room " + roomAttemptedJoin + " not found :("}
      </div>}
    </div>
  );
  }
  
  export default CreateOrJoinGame;