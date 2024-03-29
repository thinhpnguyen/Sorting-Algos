import React, { useState, useMemo } from "react";
import Graph from "./Graph.js";
import Header from "./Header.js";
import Input from "./Input.js";
import {
  BubbleSort,
  SelectionSort,
  MergeSort,
  QuickSort,
  InsertionSort,
  ShellSort,
} from "../utilities/Sort.js";

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
    nums.push(parseInt(str, 10));
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
  const [input, updateInput] = useState(
    "9 8 7 6 5 4 3 2 3 4 5 6 7 6 5 4 3 2 3 4 5 6 7 8 9"
  );

  const filteredInput = useMemo(() => filter(input), [input]); // use for labels
  const nums = useMemo(() => inputToNums(filteredInput), [filteredInput]);
  const max = useMemo(() => findMax(nums), [nums]); // use to scale the graph, so it will be changed during sorting

  //////////////// State Handles /////////////////////////
  function handleSort() {
    updateReset(false);
    updateSortEn(true);
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
      <div className="controlArea">
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
            sortFunction={SelectionSort}
          />
          <Graph
            id="myChart2"
            sortType="Bubble Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
            sortFunction={BubbleSort}
          />
          <Graph
            id="myChart3"
            sortType="Shell Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
            sortFunction={ShellSort}
          />
        </div>
        <div className="column">
          <Graph
            id="myChart4"
            sortType="Merge Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
            sortFunction={MergeSort}
          />
          <Graph
            id="myChart5"
            sortType="Quick Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
            sortFunction={QuickSort}
          />
          <Graph
            id="myChart6"
            sortType="Insertion Sort"
            sort={sortEn}
            reset={reset}
            nums={nums}
            max={max}
            sortFunction={InsertionSort}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
