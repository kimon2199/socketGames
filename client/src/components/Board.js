import Blob from "./Blob";

const Board = (props) => { //[5, 4,6, 3,5,7, 2,4,6,8, 1,3,5,7,9]

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  return(
    // <div className="grid grid-cols-10 gap-x-4 gap-y-8">
    //     {zip([...Array(15).keys()],[5, 4,6, 3,5,7, 2,4,6,8, 1,3,5,7,9]).map((i) => 
    //         <div className={" col-start-" + i[1] + " col-span-2 "} key={"blob"+i[0]}>
    //           {props.activs[i[0]] && <Blob index={i[0]} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
    //         </div>
    //     )}
    // </div>
    <div className="grid grid-cols-10 gap-x-4 gap-y-8">
      <div className={" col-start-5 col-span-2 "} key={"blob0"}>
        {props.activs[0] && <Blob index={0} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-4 col-span-2 "} key={"blob1"}>
        {props.activs[1] && <Blob index={1} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-6 col-span-2 "} key={"blob2"}>
        {props.activs[2] && <Blob index={2} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-3 col-span-2 "} key={"blob3"}>
        {props.activs[3] && <Blob index={3} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-5 col-span-2 "} key={"blob4"}>
        {props.activs[4] && <Blob index={4} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-7 col-span-2 "} key={"blob5"}>
        {props.activs[5] && <Blob index={5} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-2 col-span-2 "} key={"blob6"}>
        {props.activs[6] && <Blob index={6} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-4 col-span-2 "} key={"blob7"}>
        {props.activs[7] && <Blob index={7} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-6 col-span-2 "} key={"blob8"}>
        {props.activs[8] && <Blob index={8} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-8 col-span-2 "} key={"blob9"}>
        {props.activs[9] && <Blob index={9} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-1 col-span-2 "} key={"blob10"}>
        {props.activs[10] && <Blob index={10} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-3 col-span-2 "} key={"blob11"}>
        {props.activs[11] && <Blob index={11} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-5 col-span-2 "} key={"blob12"}>
        {props.activs[12] && <Blob index={12} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-7 col-span-2 "} key={"blob13"}>
        {props.activs[13] && <Blob index={13} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
      <div className={" col-start-9 col-span-2 "} key={"blob14"}>
        {props.activs[14] && <Blob index={14} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
      </div>
    </div>
  );
  }
  
  export default Board;