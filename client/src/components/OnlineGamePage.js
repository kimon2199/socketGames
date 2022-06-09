import { useState, useEffect } from 'react';
import Board from './Board';
import microbe1 from'../microbe1.png';
import microbe2 from'../microbe2.png';

const OnlineGamePage = () => {

  const [activs, setActivs] = useState(new Array(15).fill(true));
  const [toRem, setToRem] = useState(new Array(15).fill(false));
  const [player, setPlayer] = useState("Player 1");
  const [activeGame, setActiveGame] = useState(true);
  const [computerEndedTurn, setComputerEndedTurn] = useState(false);

  const arrayAnd = (a, b) => a.map((k, i) => k && b[i]);
  const inverted = (bools) => bools.map(bool => !bool);

  useEffect(() => {
    if (!activs.includes(true)){
      setActiveGame(false);
    }
    else {
      setPlayer(player == 'Player 1' ? 'Computer' : 'Player 1');
    }
  },[activs])

  useEffect(() => {
    if (player == 'Computer'){
      // opponentTurn(); 
      setTimeout(() => opponentTurn(), 2000);
    }
  },[player])

  useEffect(() => {
    if (computerEndedTurn){
      endTurn();
      setComputerEndedTurn(false);
    }
  },[computerEndedTurn])

  const endTurn = () => {
    if (!activeGame){
      console.log("game is over");
      return false;
    }
    if (!toRem.includes(true)){
      console.log("Remove at least one");
      return false;
    }
    setActivs(activs => arrayAnd(activs, inverted(toRem)));
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
    setActivs(new Array(15).fill(true));
    setToRem(new Array(15).fill(false));
    setActiveGame(true);
  }

  let queue = []

  const opponentTurn = () => {
    if (toRem.includes(true)){
      console.log("something is wrong)")
    }
    let i = Math.floor(Math.random() * 100) % 15;
    let cond = isValidMove(i);
    while (!cond){
      console.log("i",i, "cond", cond);
      i = Math.floor(Math.random() * 100) % 15;
      cond = isValidMove(i);
    }
    console.log("choose to toggle",i)
    toggleRemovalState(i);
    setComputerEndedTurn(true);
  }

  return(
    <div className="">
      { activeGame &&
        <h1 className="text-3xl font-bold text-white font-mono py-4">
          {"It's " + player + "'s turn"}
        </h1>
      }
      { !activeGame &&
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
        <button className={"text-white font-bold py-2 px-4 border rounded bg-yellow-500"}
          onClick={() => endTurn()}>
          {"Done Playing"}
        </button>
        <img className='w-72 h-[9.5rem]' src={microbe1}
        onMouseOver={e => (e.currentTarget.src = microbe2)}
        onMouseOut={e => (e.currentTarget.src = microbe1)}/>
    </div>
    </div>
  );
  }
  
  export default OnlineGamePage;