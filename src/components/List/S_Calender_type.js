import React from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import List from "./S_List";
import S_Layout from "../../Layouts/S_Layout";

class S_Calender_type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: null, // Initially, no button is active
    };
  }

  handleButtonClick = (button) => {
    this.setState({ activeButton: button });
  };

  render() {
    return (
      <>
        <S_Layout>
          <div className=" text-end">
            <div className="btn-group p-3">
              <Button
                variant="secondary"
                onClick={() => this.handleButtonClick("day")}
                className={
                  this.state.activeButton === "day"
                    ? "btn btn-primary my-custom-button"
                    : "btn btn-secondary my-custom-button"
                }
              >
                day
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.handleButtonClick("week")}
                className={
                  this.state.activeButton === "week"
                    ? "btn btn-primary my-custom-button"
                    : "btn btn-secondary my-custom-button"
                }
              >
                week
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.handleButtonClick("month")}
                className={
                  this.state.activeButton === "month"
                    ? "btn btn-primary my-custom-button"
                    : "btn btn-secondary my-custom-button"
                }
              >
                month
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.handleButtonClick("list")}
                className={
                  this.state.activeButton === "list"
                    ? "btn btn-primary my-custom-button"
                    : "btn btn-secondary my-custom-button"
                }
              >
                list
              </Button>
            </div>
          </div>
          {this.state.activeButton && (
            <div>
              {/* Content that appears when a button is active */}

              {this.state.activeButton === "day" && (
                <p>Day content goes here.</p>
              )}
              {this.state.activeButton === "week" && (
                <p>Week content goes here.</p>
              )}
              {this.state.activeButton === "month" && (
                <p>Month content goes here.</p>
              )}
              {this.state.activeButton === "list" && (
                <NavLink
                  to="/s_calender_type"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "black",
                      textDecoration: "none",
                    };
                  }}
                >
                  <List />
                </NavLink>
              )}
            </div>
          )}{" "}
        </S_Layout>
      </>
    );
  }
}

export default S_Calender_type;
