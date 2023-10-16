import React from "react";

class L_Aboutme extends React.Component {
  render() {
    const { description, interest } = this.props;

    return (
      <div>
        <h3>About me</h3>

        <strong>Description:</strong>
        <p>{description || "Write a brief introduction about yourself here."}</p>

        <strong>Interests:</strong>
        <p>{interest || "List your interests or hobbies here."}</p>
      </div>
    );
  }
}

export default L_Aboutme;
