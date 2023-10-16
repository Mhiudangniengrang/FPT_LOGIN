import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button,Card, CardBody } from "react-bootstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
class S_ViewTeacherAboutme extends React.Component {
  render() {
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
                <FontAwesomeIcon icon={faBriefcase} /> SWP391
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWR301
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> SWT302
              </div>
              <div style={{ float: "left", width: "50%", padding: "15px" }}>
                <FontAwesomeIcon icon={faBriefcase} /> SWE201
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> PRN211
                <br />
                <FontAwesomeIcon icon={faBriefcase} /> PRF192
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
              <a href="#" className="schedule-link text-black">
                Go to meeting schedule{" "}
              </a>
            </h4>
          </div>
          <div>
            {" "}
            <Button className="mx-2" variant="primary">
              Book Slot
            </Button>
            <Button variant="primary">Send Request</Button>
          </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default S_ViewTeacherAboutme;
