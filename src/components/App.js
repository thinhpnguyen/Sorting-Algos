import React, {useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
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
    if(event.key !== "Enter") return;
    updateReset(true);
    updateSortEn(false);
    console.log("enter");
  }
  function handleChange(event){
    const newInput = event.target.value;
    updateInput(newInput);

    updateReset(false); //allow the reset button to work again
  }

  function handleClear(){
    updateReset(false);
    updateInput("");
  }

  // cannot put inside handlechange
  // because of current closures
  // the filtered input will lack behind input by 1 item
  useEffect(()=> {
    updateNums(inputToArray());
    updateFilteredInput(filter(input));
  },[input]);

  return (
    <div >
      <Header />
      <Input handleChange = {handleChange} handleClear = {handleClear} handleEnter = {handleEnter} input = {input}/>
      <div className="globalButton">
        <button className = "button" onClick = {handleSort}>Sort</button>
        <button className = "button" onClick = {handleReset}>Reset</button>
      </div>
      
      <div className ="row">
        <div className = "column1">
          <Graph  id = "myChart1" sortType = "Selection Sort" sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
          <Graph  id = "myChart2" sortType = "Bubble Sort" sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
        </div>
        <div className = "column2">
          <Graph  id = "myChart3" sortType = "Selection Sort" sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
          <Graph  id = "myChart4" sortType = "Selection Sort" sort = {sortEn} reset = {reset} nums = {nums} label = {filteredInput}  />
        </div>
      </div>

    </div>
  );
}

export default App;
