import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
class S_Course extends React.Component {
  render() {
    return (
      <div>
        <h3 className="font-weight-bold">Course</h3>

        <strong style={{ padding: "5px" }}>Course Profile:</strong>

        <div>
          <div style={{ float: "left", width: "50%", padding: "15px" }}>
            <FontAwesomeIcon icon={faBriefcase} /> SWP391
            <br />
            <FontAwesomeIcon icon={faBriefcase} /> SWR301
            <br />
            <FontAwesomeIcon icon={faBriefcase} /> SWT302
          </div>
          <div style={{ float: "left", width: "50%", padding: "15px" }}>
            <FontAwesomeIcon icon={faBriefcase} /> SWE201C
            <br />
            <FontAwesomeIcon icon={faBriefcase} /> PRN211
            <br />
            <FontAwesomeIcon icon={faBriefcase} /> PRF192
          </div>
        </div>
      </div>
    );
  }
}

export default S_Course;
