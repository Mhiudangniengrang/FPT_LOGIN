import React from "react";

const selectStyle = {
  display: "inline - block",
  marginRight: "10px",
};

const iconStyle = {
  color: "gray",
  marginRight: "5px",
};

class Language extends React.Component {
  state = {
    Lang: 'en',
  };

  handleLanguageChange = (e) => {
    this.setState({
      Lang: e.target.value,
    });

  };

  render() {
    return (
      <div className="select" style={selectStyle}>
        <label htmlFor="language">
          <i className="fa-solid fa-earth-asia" style={iconStyle}></i>
        </label>
        <select name="language" id="language" style={selectStyle}
          value={this.state.Lang}
          onChange={(event) => this.handleLanguageChange(event)}>
          {console.log("check>>>>>" + this.state.Lang)}
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
        </select>
      </div>
    );
  }
}

export default Language;
