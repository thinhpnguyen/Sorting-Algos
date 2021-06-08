import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Graph from './graph.js';

function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(false);
  //input
  const [input, updateInput] = useState("");
  const [nums, updateNums] = useState([]);
  let inputNums = [];
  let inputNumsString = [];
  function inputToArray(){
    inputNumsString = input.split(" ", 20);
    inputNumsString.forEach(num =>{
      inputNums.push(parseInt(num));
    })
  }

  function handleSort(){
    updateSortEn(true);
    updateReset(false);

    inputToArray();

    updateNums(inputNums);

  };

  function handleReset(){
    updateSortEn(false);
    updateReset(true);

    inputToArray();
    updateNums(inputNums);
  }

  function handleChange(event){
    const newInput = event.target.value;
    updateInput(newInput);

    inputToArray();

    updateNums(inputNums);

    // console.log(newInput);
  }
  return (
    <div >
      <input placeholder = "type in a list of numbers" onChange={handleChange}></input>
      <button onClick = {handleSort}>sort</button>
      <button onClick = {handleReset}>reset</button>
      <Graph sort = {sortEn} reset = {reset} nums = {nums} label = {input}  />
    </div>
  );
}

export default App;
