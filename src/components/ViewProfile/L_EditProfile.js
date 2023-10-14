import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

class L_EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "", // Initialize description and interest fields as empty strings
      interest: "",
    };
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleInterestChange = (event) => {
    this.setState({ interest: event.target.value });
  };

  handleUpdateProfile = () => {
    // Handle the update profile logic here
    // You can use this.state.description and this.state.interest to get the user's input
  };

  render() {
    return (
      <div>
        <h3>Edit Profile</h3>

        <form>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              rows="3"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label>Interest:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.interest}
              onChange={this.handleInterestChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleUpdateProfile}
          >
            Update Profile
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default L_EditProfile;
