import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Graph from './graph.js';

function App() {
  const [sortEn, updateSortEn] = useState(false);

  function sortHandler(){
    updateSortEn(true);
  };

  return (
    <div >
      <button onClick = {sortHandler}>sort</button>
      <Graph sort = {sortEn}  />
    </div>
  );
}

export default App;
