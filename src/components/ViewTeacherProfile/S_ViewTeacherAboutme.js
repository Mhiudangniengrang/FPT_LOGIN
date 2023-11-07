import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody } from "react-bootstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const S_ViewTeacherAboutme = () => {
  const { lecturerId } = useParams();
  return (
    <div className="my-2 ">
      <Card>
        <CardBody>
          <h4>About me</h4>
          <strong>Description:</strong>
          <p> Write a brief introduction about yourself here.</p>

          <div>
            <strong>Course</strong>
            <div>Course Profile:</div>
            <div className="my-2">
              <div style={{ float: "left", width: "50%" }}>
                <FontAwesomeIcon icon={faBriefcase} /> CSI104 - Introduction to
                Computing
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWT301 - Software Testing
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWE102 - Introduction to
                Software Engineering
              </div>
              <div style={{ float: "left", width: "50%" }}>
                <FontAwesomeIcon icon={faBriefcase} /> SWR301 - Software
                Requirement
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWP391 - Application
                Development Project
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> CEA201 - Computer
                Organization and Architecture
              </div>
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
