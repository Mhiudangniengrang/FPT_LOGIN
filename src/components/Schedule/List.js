import React, { useEffect, useState } from "react";
import axios from "../../Services/customizeAxios";

const List = (props) => {
  const { semesters, currentSemesterIndex } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const studentId = 6;

    axios
      .get(`/api/v1/subject/admin/bookedSlot/homePage/${studentId}`)
      .then((response) => {
        setList(response);
      })
      .catch((error) => {
        console.log("Error at list: " + error);
      });

    axios
      .get("/api/v1/user/semester")
      .then((response) => {
        setSemesters(response);
      })
      .catch((error) => {
        console.error("Error when calling API: ", error);
      });
  }, []);

  if (!semesters?.length) {
    return (
      <div>
        <p>No semesters available.</p>
      </div>
    );
  }

  const filteredList = list.filter((item) => {
    const semester = semesters[currentSemesterIndex];
    if (semester) {
      const startDate = new Date(semester.dateStart);
      const endDate = new Date(semester.dateEnd);
      const itemDate = new Date(item.dateStart);
      return itemDate >= startDate && itemDate <= endDate;
    }
    return false;
  });

  return (
    <div>
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
          {filteredList.map((record, i) => (
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
