import React, { useEffect, useState } from "react";
import axios from "../../Services/customizeAxios";
import { Button } from "react-bootstrap";

const List = () => {
  const [list, setList] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);
  useEffect(() => {
    axios
      .get("/api/v1/slots", {
        params: {
          pageNo: list,
          pageSize: list,
          sortBy: list,
          sortDir: list,
        },
      })
      .then((response) => {
        setList(response.content); 
      })
      .catch((error) => {
        console.log("Error at list :" + error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/v1/semesters")
      .then((response) => {
        console.log(response);
        // setSemesters(response);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API: ", error);
      });
  }, []);
  useEffect(() => {
    if (semesters.length > 0) {
      // Find the "Fall 2023" semester
      const fallSemester = semesters.find(
        (semester) => semester.semesterName === "Fall 2023"
      );

      if (fallSemester) {
        // Filter slots based on the Fall 2023 semester's date range
        const filteredSlots = list.filter((slot) => {
          const slotDate = new Date(slot.dateStart);
          return (
            slotDate >= new Date(fallSemester.dateStart) &&
            slotDate <= new Date(fallSemester.dateEnd)
          );
        });
        setList(filteredSlots);
      }
    }
  }, [list, semesters, currentSemesterIndex]);

  const handleClickPrev = () => {
    if (semesters.length > 0) {
      if (currentSemesterIndex === 0) {
        setCurrentSemesterIndex(semesters.length - 1);
      } else {
        setCurrentSemesterIndex(currentSemesterIndex - 1);
      }
    }
  };

  const handleClickNext = () => {
    if (semesters.length > 0) {
      if (currentSemesterIndex === semesters.length - 1) {
        setCurrentSemesterIndex(0);
      } else {
        setCurrentSemesterIndex(currentSemesterIndex + 1);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleClickPrev}>
          Previous
        </Button>
        <div>{semesters[currentSemesterIndex]?.semesterName}</div>
        <Button variant="secondary" onClick={handleClickNext}>
          Next
        </Button>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Lecturer ID</th>
            <th>Lecturer Name</th>
            <th>Slot</th>
            <th>Subject</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {list.map((record, i) => (
            <tr key={i}>
              <td>{record.lecturerId}</td>
              <td>{record.lecturerName}</td>
              <td>{record.slotTimeId}</td>
              <td>{record.subjectId}</td>
              <td>{record.dateStart}</td>
              <td>{record.status}</td>
              <td>{record.timeStart}</td>
              <td>{record.duration}</td>
              <td>{record.roomId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
