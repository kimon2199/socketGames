import { useState } from 'react';

const Blob = (props) => {

  const blue = ' bg-blue-500 hover:bg-blue-700 active:bg-blue-800 border-blue-800 ';
  const red = ' bg-red-700 hover:bg-red-800 active:bg-red-900 border-red-900 ';

  const [color, setColor] = useState(blue);
  const [state, setState] = useState('exists');

  const switchColor = () => {
    if (color.includes('red')){
      setColor(blue);
      props.toggleRemovalState(props.index)
    }
    else {
      if (props.isValidMove(props.index)){
        setColor(red);
        props.toggleRemovalState(props.index)
      }
      else {
        console.log("invalid move")
      }
    }
  }

  return (
    <button className={"w-full text-white font-bold py-2 px-4 border rounded" + color}
      onClick={() => switchColor()}>
      {props.index}
    </button>
    )
}

export default Blob;