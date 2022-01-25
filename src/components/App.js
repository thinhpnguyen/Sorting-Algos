import React, {useState} from 'react';
import Graph from './Graph.js';
import Header from "./Header.js";
import Input from "./Input.js";
function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(true); // render empty graph first
  //input
  const [input, updateInput] = useState("");
  const [nums, updateNums] = useState([]);
  const [filteredInput, updateFilteredInput] = useState("") // use for labels


  //this function takes in a string
  //filter the words that are numbers
  function filter(str){
    // only takes str the first 20 numbers, exlude other characters
    str = str.replace(/[^\d\s]/g, '');
    str = str.replace(/\s\s+/g, ' ');
    str = str.replace(/(^\s|\s$)/g, '');
    //console.log(str);
    return str.split(' ', 50);
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
  };

  function handleReset(){
    updateReset(true);
    updateSortEn(false);
  }

  function handleEnter(event){
    if(event.key != "Enter") return;
    updateReset(true);
    updateSortEn(false);
  }
  function handleChange(event){
    const newInput = event.target.value;
    updateInput(newInput);
    updateNums(inputToArray());
    updateFilteredInput(filter(input));
    updateReset(false); //allow the reset button to work again
  }

  function handleClear(){
    updateReset(false);
    updateInput("");
  }
  return (
    <div >
      <Header />
      <Input handleChange = {handleChange} handleClear = {handleClear} handleEnter = {handleEnter} input = {input}/>
      <button onClick = {handleSort}>sort</button>
      <button onClick = {handleReset}>reset</button>
      <Graph sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
    </div>
  );
}

export default App;
