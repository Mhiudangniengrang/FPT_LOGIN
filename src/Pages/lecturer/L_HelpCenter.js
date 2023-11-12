import React from "react";
import L_Layout from "../../Layouts/L_Layout";
import { Card } from "react-bootstrap";
import DownloadButton from "../../components/Excel/DownloadExcel";
import { useData } from "../../context/DataContext";

const L_HelpCenter = () => {
  return (
    <L_Layout>
      <h3>Site announcements</h3>
      <div>
        <p>Here is where you can find information on various topics:</p>
        <Card style={{ padding: "30px" }}>
          <div>
            <h5>I. Guide to using the MML - MEET MY LECTURER system:</h5>
            <p>
              <b>Introduction:</b> This is a scheduling website for lecturers and
              students. While students can meet lecturers by scheduling appointments
              through Meet My Lecturer, lecturers can also create available slots for
              students to book.
            </p>
            <p>
              <b>For teachers:</b>{" "}
            </p>
            <p>
              <ol>
                <li>
                  Update your
                  subjects so that student can easily send requests or choose your teaching subject that they want to disscuss in the meeting.
                </li>
                <li>
                  The application allows lecturers to log in to the system to create
                  available slots with durations of 15, 30, or 45 minutes for students
                  to book.
                </li>
                <li>
                  Process student meeting requests and assign them to available slots or reject them.
                </li>
                <li>
                  Handle cases of student absence from scheduled meetings. The system will take measures to address violations by students.
                </li>
                <li>
                  Import teaching schedule with this excel format: <DownloadButton />
                </li>
              </ol>
            </p>
            <p>
              <b>Note: If teachers cannot find the MML, please contact Zalo:
                0939 421 192</b>
            </p>
          </div>

          <div>
            <p>
              {" "}
              <b>For students:</b>
            </p>
            <p>
              <ol>
                <li>
                  Update your majors, subjects, and the lecturers you are currently studying with so that you can easily send meeting requests to them.

                </li>
                <li>
                  Students can search for a subject's name, lecturer's name, and view
                  information (teaching schedule, meeting schedule).
                </li>
                <li>
                  Students can send meeting requests to lecturers. Lecturers will
                  process these requests by accepting and assigning them to available
                  slots or rejecting them.
                </li>
              </ol>
            </p>
            <p></p>
            <p>
              <b>Note: If students are absent from pre-scheduled meetings, the Meet My Lecturer system will take measures.</b>
            </p>
          </div>
        </Card>

      </div>


    </L_Layout>
  );
};

export default L_HelpCenter;
