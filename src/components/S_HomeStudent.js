import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import RelatedCourse from "./Slot & Course/RealatedCourse";
import BookedSlot from "./Slot & Course/BookedSlot";
import Requested from "./Slot & Course/Requested";

function S_HomeStudent() {

  return (
    <div>
      <Tabs
        activeKey={'events'}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events"
        >
          <BookedSlot />
          <Requested />
        </Tab>
      </Tabs>

      <Tabs
        activeKey={"related"}
        className="mb-3"
      >
        <Tab eventKey="related" title="Related Courses">
          <RelatedCourse />
        </Tab>
      </Tabs>
    </div >
  );

}

export default S_HomeStudent;
