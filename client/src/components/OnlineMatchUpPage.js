import { useState, useEffect } from 'react';
import OnlineGamePage from './OnlineGamePage';
import CreateOrJoinGame from './CreateOrJoinGame';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const OnlineMatchUpPage = () => {

  const [room, setRoom] = useState('');
  const [membersJoined, setMembersJoined] = useState(false); //maybe combine with activeGame

  const [playerName, setPlayerName] = useState('');
  const [otherPlayer, setOtherPlayer] = useState('');
  const [turn, setTurn] = useState(false);
  const [activs, setActivs] = useState(new Array(15).fill(true));

  useEffect(() => {
    socket.on("start_game", (data) => {
      setPlayerName(data.playerName);
      setOtherPlayer(data.otherPlayer);
      setTurn(data.turn);
      setActivs(data.activs);
      setMembersJoined(true);
    })
  },[socket])

  return(
    <div className="">
      <div className={"text-white font-bold py-2 px-4 border bg-red-900"}>
        {room}
      </div>
      { membersJoined ? <OnlineGamePage socket={socket} room={room} playerName={playerName} otherPlayer={otherPlayer} 
                          turn={turn} setTurn={setTurn} activs={activs} setActivs={setActivs}/> : 
              <CreateOrJoinGame socket={socket} setRoom={r => setRoom(r)}/>}
    </div>
  );
  }
  
  export default OnlineMatchUpPage;