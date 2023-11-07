import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const S_Course = (props) => {
  const selectedSubjects = props.selectedSubjects;
  return (
    <div>
      <strong>Course:</strong>
      <p>{selectedSubjects}</p>
    </div>
  );
};

export default S_Course;
