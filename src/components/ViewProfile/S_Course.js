import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const S_Course = ({ name, course }) => {
  return (
    <div>
      <strong>Course:</strong>
      {Array.isArray(course) ? (
        <div>
          {course.map((subject) => (
            <div className="d-flex" key={subject.subjectId}>
              <FontAwesomeIcon className="my-1 mx-2" icon={faBriefcase} />
              <p>
                {subject.subjectId} - {subject.lecturerName}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default S_Course;
