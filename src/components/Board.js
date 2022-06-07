import Blob from "./Blob";
import microbe1 from'../microbe1.png';

const Board = (props) => { //[5, 4,6, 3,5,7, 2,4,6,8, 1,3,5,7,9]

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  return(
    <div className="grid grid-cols-10 gap-x-4 gap-y-8">
        {zip([...Array(15).keys()],[5, 4,6, 3,5,7, 2,4,6,8, 1,3,5,7,9]).map((i) => 
            <div className={"col-span-2 col-start-" + i[1]}>
              {props.activs[i[0]] && <Blob index={i[0]} toggleRemovalState={i => props.toggleRemovalState(i)} isValidMove={i => props.isValidMove(i)}/>}
            </div>
        )}
    </div>
  );
  }
  
  export default Board;