import React from 'react'

function header(){
    return <div className="navbar" onClick = {() => {(window.location.href = "/")}}>
        Flow
    </div>
}

export default header;