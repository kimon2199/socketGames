import { useState } from 'react';
import microbe1 from'../microbe1.png';
import microbe2 from'../microbe2.png';
import microbe3 from'../microbe3.png';

const Blob = ({turn, ...props}) => {

  const [clicked, setClicked] = useState(false);

  const switchColor = (e) => {
    if (!turn) {
      return;
    }
    if (clicked){
      e.currentTarget.src = microbe1;
      setClicked(clicked => !clicked)
      props.toggleRemovalState(props.index)
    }
    else {
      if (props.isValidMove(props.index)){
        e.currentTarget.src = microbe3;
        setClicked(clicked => !clicked)
        props.toggleRemovalState(props.index)
      }
      else {
        console.log("invalid move")
      }
    }
  }

  return (
    <img className='w-24 h-16' src={microbe1}
    onMouseOver={e => (e.currentTarget.src = clicked ? microbe3 : turn ? microbe2 : microbe1)}
    onMouseOut={e => (e.currentTarget.src = clicked ? microbe3 : microbe1)}
    onClick={e => switchColor(e)} alt="Blob"/>
    )
}

export default Blob;