import React from "react";

function Language() {
  const selectStyle = {
    display: "inline - block",
    marginRight: "10px",
  };

  const iconStyle = {
    color: "gray",
    marginRight: "5px",
  };

  return (
    <div className="select" style={selectStyle}>
      <label for="language">
        <i className="fa-solid fa-earth-asia" style={iconStyle}></i>
      </label>
      <select name="language" id="language">
        <option value="english">English</option>
        <option value="vietnamese">Vietnamese</option>
      </select>
    </div>
  );
}

export default Language;
