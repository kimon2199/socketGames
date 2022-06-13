
const InfoCardOnline = ({ playerName, otherPlayer, room, turn }) => {

  const commonStyles = 'min-h-[70px] flex justify-center items-center border-2 border-violet-200 text-sm font-light text-violet-200';

  return(
    <div className="w-full">
      <div className="flex justify-center relative">
        <div className="absolute top-[16px] bg-violet-200 w-9 h-9 rounded-full flex items-center justify-center text-indigo-800">
          VS
        </div>
      </div>
      { turn ? <div className="flex justify-start relative">
          <div className="absolute top-[8px] left-[8px] bg-red-800 w-11 h-6 rounded-xl flex items-center justify-center text-white text-sm font-bold">
            Turn
          </div>
        </div> :
        <div className="flex justify-end relative">
          <div className="absolute top-[8px] right-[8px] bg-red-800 w-11 h-6 rounded-xl flex items-center justify-center text-white text-sm font-bold">
            Turn
          </div>
        </div>
      }
      <div className='grid grid-cols-2 w-full bg-indigo-800 rounded-2xl shadow-lg'>
        <div className={`rounded-tl-2xl sm:min-w-[120px] ${commonStyles} ` + (turn ? "bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800":"")}>
            {playerName}
        </div>
        <div className={`rounded-tr-2xl sm:min-w-[120px] ${commonStyles} ` + (turn ? "" : "bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800")}>
            {otherPlayer}
        </div>
        <div className={`rounded-bl-2xl col-span-2 rounded-br-2xl ${commonStyles}`}>
            <h3 className="">Room Code:</h3>
            <h3 className="text-red-300 text-2xl px-2">{room}</h3>
        </div>
      </div>
    </div>
  );
}
    
export default InfoCardOnline;