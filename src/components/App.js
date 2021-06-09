import React, {useState} from 'react';
import Graph from './graph.js';

function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(false);
  //input
  const [input, updateInput] = useState("");
  const [nums, updateNums] = useState([]);
  const [filteredInput, updateFilteredInput] = useState("")

  let inputNums = [];

  function filter(input){
    let newInput = input.split(' ', 20);
    //only take in int
    newInput = newInput.filter(num => {
      return !isNaN(parseInt(num));
    })
    return newInput;
  }

  function inputToArray(){
    
    let newInput = filter(input);

    newInput.forEach(num =>{
        inputNums.push(parseInt(num));
    })
  }

  function handleSort(){
    updateSortEn(true);
    updateReset(false);

    inputToArray();

    updateNums(inputNums);
    console.log(inputNums)

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
    updateFilteredInput(filter(newInput));
    inputToArray();
  
    updateNums(inputNums);

  }
  return (
    <div >
      <input placeholder = "type in a list of numbers" onChange={handleChange}></input>
      <button onClick = {handleSort}>sort</button>
      <button onClick = {handleReset}>reset</button>
      <Graph sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
    </div>
  );
}

export default App;
