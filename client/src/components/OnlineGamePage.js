import { useState, useEffect } from 'react';
import Board from './Board';
import InfoCard from './InfoCard';
import microbe1 from'../microbe1.png';
import microbe2 from'../microbe2.png';

const OnlineGamePage = ({ socket, room, playerName, otherPlayer, turn, setTurn, activs, setActivs }) => {

  // const [activs, setActivs] = useState(new Array(15).fill(true));
  const [toRem, setToRem] = useState(new Array(15).fill(false));
  const [player, setPlayer] = useState(playerName);
  const [activeGame, setActiveGame] = useState(true);
  const [computerEndedTurn, setComputerEndedTurn] = useState(false);

  const arrayAnd = (a, b) => a.map((k, i) => k && b[i]);
  const inverted = (bools) => bools.map(bool => !bool);

  useEffect(() => {
    if (!activs.includes(true)){
      setActiveGame(false);
    }
    else {
      setPlayer(player == playerName ? otherPlayer : playerName);
    }
  },[activs])

  // useEffect(() => {
  //   if (turn) {
  //     playTurn();
  //   }
  //   else {
  //     waitTurn();
  //   }
  // },[player])

  useEffect(() => {
    socket.on("move_done", (data) => {
      setTurn(data.turn);
      setActivs(data.activs);
    })
  },[socket])

  useEffect(() => {
    socket.on("restart_game", (data) => {
      setToRem(new Array(15).fill(false));
      setActiveGame(true);
      setTurn(data.turn);
      setActivs(data.activs);
    })
  },[socket])

  const endTurn = () => {
    if (!activeGame){
      console.log("game is over");
      return false;
    }
    if (!toRem.includes(true)){
      console.log("Remove at least one");
      return false;
    }
    socket.emit("make_move", { room, toRem: inverted(toRem) });
    // setActivs(activs => arrayAnd(activs, inverted(toRem)));
    setToRem(new Array(15).fill(false));
    return true;
  }

  const toggleRemovalState = (i) => {
    setToRem(toRem => [...toRem.slice(0,i), !toRem[i], ...toRem.slice(i+1)])
  }

  const isValidMove = index => {
    if (!activs[index]){
      console.log("Index",index,"is not active")
      return false;
    }
    if (index == 0){
      return [...toRem.slice(1)].includes(true) ? false : true;
    } else if (index <= 2) {
      return [...toRem.slice(0,1), ...toRem.slice(3)].includes(true) ? false : true;
    } else if (index <= 5) {
      return [...toRem.slice(0,3), ...toRem.slice(6)].includes(true) ? false : true;
    } else if (index <= 9) {
      return [...toRem.slice(0,6), ...toRem.slice(10)].includes(true) ? false : true;
    } else {
      return [...toRem.slice(0,10)].includes(true) ? false : true;
    }
    
  }

  const resetGame = () => {
    socket.emit('restart_game', { room });
  }

  return(
    <div className="">
      { activeGame ?
        <h1 className="text-3xl font-bold text-white font-mono py-4">
          {"It's " + player + "'s turn"}
        </h1> :
        <div>
          <h1 className="text-3xl font-bold text-white font-mono">
            {player + " just lost the game!! :("}
          </h1>
          <button className={"text-white font-bold py-2 px-4 border rounded bg-green-500"}
            onClick={() => resetGame()}>
            {"Replay"}
          </button>
        </div>
      }
      <div className='grid place-items-center'>
        <div className='box-content h-96 w-[32rem] p-4 border-4 rounded-lg'>
          <Board activs={activs} toggleRemovalState={i => toggleRemovalState(i)} isValidMove={i => isValidMove(i)}/>
        </div>
      </div>
      <div className="py-6 grid place-items-center">
        {turn && <button className={"text-white font-bold py-2 px-4 border rounded bg-yellow-500"}
          onClick={() => endTurn()}>
          {"Done Playing"}
        </button>}
        <div className='w-[32rem]'>
          <InfoCard playerName={playerName} otherPlayer={otherPlayer} room={room}/>
        </div>
        <img className='w-72 h-[9.5rem]' src={microbe1}
        onMouseOver={e => (e.currentTarget.src = microbe2)}
        onMouseOut={e => (e.currentTarget.src = microbe1)}/>
      </div>
    </div>
  );
  }
  
  export default OnlineGamePage;