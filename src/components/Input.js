import React from 'react';

function input(props){
    return <div className="inputField">
         <input 
         placeholder = "Type in a list of numbers. Ex: 3 5 7 9" 
         onChange={props.handleChange} 
         className="input"
         value = {props.input}
         />

         <i className="clearButton" onClick = {props.handleClear}>
             clear
         </i>
    </div>
}

export default input;