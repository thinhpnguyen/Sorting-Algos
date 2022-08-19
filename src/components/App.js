import React, { useState, useMemo } from "react";
import Graph from "./Graph.js";
import Header from "./Header.js";
import Input from "./Input.js";

//this function takes in a string
//filter out only the number part
function filter(str) {
  // only takes str the first 20 numbers, exlude other characters
  str = str.replace(/[^\d\s]/g, "");
  str = str.replace(/\s\s+/g, " ");
  str = str.replace(/(^\s|\s$)/g, "");
  //console.log(str);
  return str.split(" ", 100);
}
function inputToNums(filtered) {
  let nums = [];
  filtered.forEach((str) => {
    nums.push(parseInt(str));
  });
  return nums;
}

function findMax(nums) {
  let m = 1; // default value for y-axis
  nums.forEach((num) => {
    if (num > m) m = num;
  });
  return m;
}

function App() {
  const [sortEn, updateSortEn] = useState(false);
  const [reset, updateReset] = useState(true); // render empty graph first
  //input
  const [input, updateInput] = useState("");

  const filteredInput = useMemo(() => filter(input), [input]); // use for labels
  const nums = useMemo(() => inputToNums(filteredInput), [filteredInput]);
  const max = useMemo(() => findMax(nums), [nums]); // use to scale the graph, so it will be changed during sorting

  //////////////// State Handles /////////////////////////
  function handleSort() {
    updateSortEn(true);
    updateReset(false);
  }

  function handleReset() {
    //console.log(nums);
    updateReset(true);
    updateSortEn(false);
  }

  function handleEnter(event) {
    if (event.key !== "Enter") return;
    updateReset(true);
    updateSortEn(false);
    //console.log("enter");
  }
  function handleChange(event) {
    const newInput = event.target.value;
    updateInput(newInput);
    updateReset(false); //allow the reset button to work again
  }

  function handleClear() {
    updateReset(false);
    updateInput("");
  }

  return (
    <div>
      <Header />
      <Input
        handleChange={handleChange}
        handleClear={handleClear}
        handleEnter={handleEnter}
        input={input}
      />
      <div className="globalButton">
        <button className="button" onClick={handleSort}>
          Sort
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="row">
        <div className="column">
          <Graph
            id="myChart1"
            sortType="Selection Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
          />
          <Graph
            id="myChart2"
            sortType="Bubble Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
          />
        </div>
        <div className="column">
          <Graph
            id="myChart3"
            sortType="Merge Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
          />
          <Graph
            id="myChart4"
            sortType="Quick Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
