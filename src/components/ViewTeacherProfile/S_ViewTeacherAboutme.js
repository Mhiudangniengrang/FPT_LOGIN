import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody } from "react-bootstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const S_ViewTeacherAboutme = (props) => {
  const { subjects } = props;
  const { lecturerId } = useParams();
  return (
    <div className="my-2 ">
      <Card>
        <CardBody>
          <h4>About me</h4>

          <div>
            <strong>Course</strong>
            <div className="my-2">
              {subjects.map((res) => (
                <p key={res.lecturerId}>
                  <FontAwesomeIcon icon={faBriefcase} /> {res.subjectId} -{" "}
                  {res.lecturerName}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h5>
              {" "}
              <a href="#" className="schedule-link text-black ">
                Go to teaching schedule &gt;&gt;&gt;
              </a>
            </h5>
            <h5>
              <a
                href={`/student/lecturer/viewschedule/${lecturerId}`}
                className="schedule-link text-black"
              >
                Go to meeting schedule &gt;&gt;&gt;
              </a>
            </h5>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default S_ViewTeacherAboutme;
