import { useState, useEffect } from 'react';
import Board from './Board';
import microbe1 from'../microbe1.png';

const LocalMultPage = () => {

  const [activs, setActivs] = useState(new Array(15).fill(true));
  const [toRem, setToRem] = useState(new Array(15).fill(false));
  const [player, setPlayer] = useState("Player 1");
  const [activeGame, setActiveGame] = useState(true);

  const arrayAnd = (a, b) => a.map((k, i) => k && b[i]);
  const inverted = (bools) => bools.map(bool => !bool);

  useEffect(() => {
    if (!activs.includes(true)){
      setActiveGame(false);
    }
  },[activs])

  const endTurn = () => {
    if (!activeGame){
      console.log("game is over");
      return;
    }
    if (!toRem.includes(true)){
      console.log("Remove at least one");
      return;
    }
    setActivs(activs => arrayAnd(activs, inverted(toRem)));
    setToRem(new Array(15).fill(false));
    if (!activs.includes(true)){
      setActiveGame(false);
    }
    console.log("activs:");
    console.log(activs);
    setPlayer(player == 'Player 1' ? 'Player 2' : 'Player 1')
  }
  const toggleRemovalState = (i) => {
    setToRem(toRem => [...toRem.slice(0,i), !toRem[i], ...toRem.slice(i+1)])
  }

  const isValidMove = index => {
    if (index == 0){
      return [...toRem.slice(1)].includes(true) ? false : true;
    } else if (index <= 2) {
      return [...toRem.slice(0,1), ...toRem.slice(5)].includes(true) ? false : true;
    } else if (index <= 5) {
      return [...toRem.slice(0,3), ...toRem.slice(9)].includes(true) ? false : true;
    } else if (index <= 9) {
      return [...toRem.slice(0,6), ...toRem.slice(13)].includes(true) ? false : true;
    } else {
      return [...toRem.slice(0,10)].includes(true) ? false : true;
    }
    
  }

  const resetGame = () => {
    setActivs(new Array(15).fill(true));
    setToRem(new Array(15).fill(false));
    setActiveGame(true);
  }

  return(
    <div className="">
      { activeGame &&
        <h1 className="text-3xl font-bold text-white font-mono py-16">
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
          {"Done Playing" + toRem[1]}
        </button>
        <img className='w-72 h-72' src={microbe1}/>
    </div>
    </div>
  );
  }
  
  export default LocalMultPage;