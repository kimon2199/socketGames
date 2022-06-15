import { useState, useEffect } from 'react';
import Board from './Board';
import InfoCardLocal from './InfoCardLocal';

const AiPage = () => {

  const player1 = "Player 1";
  const player2 = "Computer";

  const [activs, setActivs] = useState(new Array(15).fill(true));
  const [toRem, setToRem] = useState(new Array(15).fill(false));
  const [player, setPlayer] = useState("");
  const [activeGame, setActiveGame] = useState(true);
  const [computerEndedTurn, setComputerEndedTurn] = useState(false);

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
    if (!activeGame){
      return
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
      <div className='grid place-items-center pt-5'>
        <div className="relative">
          {(player === player1) && activeGame && <button className={"absolute top-[1px] left-[188px] text-white font-bold py-2 px-4 border border-violet-200 rounded-tr-2xl rounded-bl-2xl bg-yellow-500"}
            onClick={() => endTurn()}>
            {"End Turn"}
          </button>}
        </div>
        <div className='box-content h-96 w-[32rem] bg-indigo-800 border-2 border-violet-200 rounded-2xl'>
          { activeGame ? <div className='p-4'>
              <Board activs={activs} toggleRemovalState={i => toggleRemovalState(i)} isValidMove={i => isValidMove(i)} turn={player === player1}/>
            </div> :
            <div>
              <h1 className="text-3xl font-bold text-white font-mono">
                {player + " just lost the game!" + (player === player1 ? " Better luck next time!" : " You win!!")}
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
  
  export default AiPage;