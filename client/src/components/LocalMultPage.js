import { useState, useEffect } from 'react';
import Board from './Board';
import InfoCardLocal from './InfoCardLocal';

const LocalMultPage = () => {

  const player1 = "Player 1";
  const player2 = "Player 2";

  const [activs, setActivs] = useState(new Array(15).fill(true));
  const [toRem, setToRem] = useState(new Array(15).fill(false));
  const [player, setPlayer] = useState(player2);
  const [activeGame, setActiveGame] = useState(true);

  const arrayAnd = (a, b) => a.map((k, i) => k && b[i]);
  const inverted = (bools) => bools.map(bool => !bool);

  useEffect(() => {
    if (!activs.includes(true)){
      setActiveGame(false);
    }
    else {
      setPlayer(player == player1 ? player2 : player1);
    }
  },[activs])

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

  return(
    <div className="">
      <div className='grid place-items-center pt-5'>
        <div className="relative">
          { activeGame &&
            <button className={"absolute top-[1px] text-white font-bold py-2 px-4 border border-violet-200 \
              bg-violet-800 " + (player === player1 ? " right-[188px] rounded-tl-2xl rounded-br-2xl" :
              "left-[188px] rounded-tr-2xl rounded-bl-2xl")} onClick={() => endTurn()}>
              End Turn
            </button>
          }
        </div>
        <div className='box-content h-96 w-[32rem] bg-indigo-800 border-2 border-violet-200 rounded-2xl'>
          { activeGame ? <div className='p-4'>
              <Board activs={activs} toggleRemovalState={i => toggleRemovalState(i)} isValidMove={i => isValidMove(i)} turn={true}/>
            </div> :
            <div>
              <h1 className="text-3xl font-bold text-white font-mono">
                {player + " just lost the game!"}
              </h1>
              <button className={"text-white font-bold py-2 px-4 border rounded bg-green-500"}
                onClick={() => resetGame()}>
                {"Replay"}
              </button>
            </div>
          }
        </div>
        <div className='w-[32rem] pt-5 pb-10'>
          <InfoCardLocal player1={player1} player2={player2} turn={player === player1}/>
        </div>
      </div>
    </div>
  );
  }
  
  export default LocalMultPage;