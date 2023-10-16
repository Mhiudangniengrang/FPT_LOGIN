import React, { Component } from "react";

class S_EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
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
    const { description, interest } = this.state;
    this.props.onUpdateProfile(description, interest);
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
            <label>Interests:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.interest}
              onChange={this.handleInterestChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary my-3"
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

export default S_EditProfile;
