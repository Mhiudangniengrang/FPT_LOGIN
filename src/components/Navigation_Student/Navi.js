import React from "react";
import "./Navi.scss";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";

class Navi extends React.Component {
  handleClickButton = () => {
    alert("Create Successfully");
  };
  render() {
    return (
      <div className="sidebar">
        <button className="create" onClick={() => this.handleClickButton()}>
          <AiOutlinePlus  />
          Create
        </button>
        <NavLink to="/" activeClassName="active" exact={true}>
          <AiOutlineHome className="icons" />
          Home
        </NavLink>
        <NavLink to="/MeetingSchedule" activeClassName="active">
          <SlCalender className="icons" />
          MeetingSchedule
        </NavLink>
        <NavLink to="/History" activeClassName="active">
          <AiOutlineHistory className="icons" />
          History
        </NavLink>
        <NavLink to="/HelpCenter" activeClassName="active">
          <BiHelpCircle className="icons" />
          Help Center
        </NavLink>
      </div>
    );
  }
}

export default Navi;
