import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Graph from './graph.js';

function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(false);
  //input
  const [nums, updateNums] = useState([12, 11, 3, 5, 2, 4, 33, 21, 13, 7, 10]);

  function handleSort(){
    updateSortEn(true);
    updateReset(false);
  };

  function handleReset(){
    updateSortEn(false);
    updateReset(true);
    updateNums([12, 11, 3, 5, 2, 4, 33, 21, 13, 7, 1])
  }
  return (
    <div >
      <button onClick = {handleSort}>sort</button>
      <button onClick = {handleReset}>reset</button>
      <Graph sort = {sortEn} reset = {reset} nums = {nums}  />
    </div>
  );
}

export default App;
