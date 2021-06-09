import React, {useState} from 'react';
import Graph from './graph.js';

function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(false);
  //input
  const [input, updateInput] = useState("");
  const [nums, updateNums] = useState([]);
  const [filteredInput, updateFilteredInput] = useState("")


  //this function takes in a string
  //filter the words that are numbers
  function filter(input){
    let newInput = input.split(' ', 20);
    //only take in int
    newInput = newInput.filter(num => {
      return !isNaN(parseInt(num));
    })
    return newInput;
  }

  //////////////// State Handles /////////////////////////

  function inputToArray(){
    
    let nums = [];
    let newInput = filter(input);

    newInput.forEach(num =>{
        nums.push(parseInt(num));
    })

    return nums;
  }

  function handleSort(){
    updateSortEn(true);
    updateReset(false);

    // updateNums(inputToArray());


  };

  function handleReset(){
    updateSortEn(false);
    updateReset(true);

    updateNums(inputToArray());
    updateFilteredInput(filter(input));
  }

  function handleChange(event){
    const newInput = event.target.value;
    updateInput(newInput);

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
