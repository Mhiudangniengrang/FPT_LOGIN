import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
class S_Aboutme extends React.Component {
  render() {
    const { description, course } = this.props;

    return (
      <div>
        <h3>About me</h3>

        <strong>Description:</strong>
        <p>
          {description || "Write a brief introduction about yourself here."}
        </p>

        <strong>Course:</strong>
        {Array.isArray(course) ? (
          <div>
            {course.map((subject) => (
              <div className="d-flex" key={subject.id}> {/* Set the key here */}
                <FontAwesomeIcon className="my-1 mx-2" icon={faBriefcase} />
                <p>{subject.name}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default S_Aboutme;
