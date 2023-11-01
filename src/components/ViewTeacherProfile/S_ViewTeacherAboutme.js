import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody } from "react-bootstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useData } from "../../context/DataContext";
const S_ViewTeacherAboutme = () => {
  const { lecturerId } = useParams()
  return (
    <div className="my-2 ">
      <Card>
        <CardBody>
          <h5>About me</h5>
          <strong>Description:</strong>
          <p> Write a brief introduction about yourself here.</p>

          <div>
            <h3 className="font-weight-bold">Course</h3>

            <strong style={{ padding: "5px" }}>Course Profile:</strong>

            <div>
              <div style={{ float: "left", width: "50%", padding: "15px" }}>
                <FontAwesomeIcon icon={faBriefcase} /> CSI104 - Introduction
                to Computing
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWT301 - Software
                Testing
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWE102 - Introduction
                to Software Engineering
              </div>
              <div style={{ float: "left", width: "50%", padding: "15px" }}>
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
            <h4>
              {" "}
              <a href="#" className="schedule-link text-black ">
                Go to teaching schedule
              </a>
            </h4>
            <h4>
              <a href={`/student/lecturer/viewschedule/${lecturerId}`} className="schedule-link text-black">
                Go to meeting schedule{" "}
              </a>
            </h4>
          </div>
          <div>
            {" "}
            <Button variant="primary" onClick={() => handleSubmit()}>Send Request</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


export default S_ViewTeacherAboutme;
