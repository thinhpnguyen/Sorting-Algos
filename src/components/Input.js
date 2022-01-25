import React from 'react';

function input(props){
    return <div className="inputField">
         <input 
         placeholder = "Type in a list of numbers. Ex: 3 5 7 9" 
         onChange={props.handleChange} 
         className="input"
         value = {props.input}
         />
        <div>
            <i className="fas fa-times clearButton" onClick = {props.handleClear}></i>
        </div> 
    </div>
}

export default input;