import React from "react";
import { Button, Card } from "react-bootstrap";
import WeeklyCalendar from "./Schedule/Week";

class Calender_type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: "week",
    };
  }

  handleButtonClick = (button) => {
    this.setState({ activeButton: button });
  };

  render() {
    return (
      <>
        <div className="text-end">
          <div className="btn-group">
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
          <Card className="text-center">
            <Card.Body>
              {/* Content that appears when a button is active */}
              {this.state.activeButton === "day" && (
                <p>Day content goes here.</p>
              )}
              {this.state.activeButton === "week" && (
                <WeeklyCalendar />
              )}
              {this.state.activeButton === "month" && (
                <p>Month content goes here.</p>
              )}
              {this.state.activeButton === "list" && (
                <p>List content goes here.</p>
              )}
            </Card.Body>
          </Card>
        )}{" "}
      </>
    );
  }
}

export default Calender_type;
