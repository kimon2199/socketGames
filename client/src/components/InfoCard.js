
const InfoCard = ({ playerName, otherPlayer, room }) => {

  const commonStyles = 'min-h-[70px] flex justify-center items-center border-[0.5px] border-violet-200 text-sm font-light text-violet-200';
  return(
    <div className="w-full">
      <div className="flex justify-center relative top-[53px]">
        <div className="bg-violet-200 w-9 h-9 rounded-full flex items-center justify-center text-indigo-800">
          VS
        </div>
      </div>
      <div className='grid grid-cols-2 w-full bg-indigo-800 rounded-2xl shadow-lg'>
        <div className={`rounded-tl-2xl sm:min-w-[120px] ${commonStyles}`}>
            {playerName}
        </div>
        <div className={`rounded-tr-2xl sm:min-w-[120px] ${commonStyles}`}>
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
    
    export default InfoCard;