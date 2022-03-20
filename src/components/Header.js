import React from "react";

function header() {
  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Flow
      </div>
    </div>
  );
}

export default header;
