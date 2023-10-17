import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
class L_Course extends React.Component {
  render() {
    const { course } = this.props;

    return (
      <div>
        <strong>Course:</strong>

        {Array.isArray(course) ? (
          <div>
            {course.map((subject) => (
              <div className="d-flex">
                <FontAwesomeIcon className="my-1 mx-2" icon={faBriefcase} />
                <p key={subject.id}>{subject.name}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default L_Course;
