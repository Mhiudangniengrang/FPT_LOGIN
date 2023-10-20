import React, { useState } from "react";
import data from "../../S_Data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function S_List() {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSubject, setEditedSubject] = useState("");
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const options = ["Summer-2023", "Fall-2023", "Spring-2023"];
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? options.length - 1 : prevIndex - 1
    );
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(no) {
    setCurrentPage(no);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleRecordsPerPageChange(e) {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  function handleEditClick(index) {
    setIsEditing(true);
    setEditingIndex(index);
    setEditedSubject(records[index].subject);
    console.log("Edit clicked for index:", index);
  }

  //   function handleDeleteClick(index) {

  //   }

  function handleSaveClick(index) {
    records[index].subject = editedSubject;
    setIsEditing(false);
    setEditingIndex(null);

    // Show a notification
    toast.success("Changes saved successfully", {
      position: "top-right",
      autoClose: 2000, // You can adjust the duration
    });
  }

  return (
    <div>
      <ToastContainer />

      <div className="d-flex justify-content-between">
        <Button onClick={handlePrev}>Previous</Button>
        <h3
          style={{
            marginLeft: "1rem",
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: 700,
            color: "#6B7280",
          }}
          className={activeIndex === 0 ? "" : ""}
        >
          {options[activeIndex]}
        </h3>

        <Button onClick={handleNext}>Next</Button>
      </div>

      <Card className="text-center my-5">
        <Card.Body>
          <div className="d-flex align-items-center ">
            Show{" "}
            <Form.Select
              className="w-25"
              aria-label="Default select example"
              as="select"
              size="sm"
              onChange={handleRecordsPerPageChange}
              value={recordsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>{" "}
            entries
          </div>

          <table className="table text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Lecture</th>
                <th>Date</th>
                <th>Time Start</th>
                <th>Slot</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  <td>{record.no}</td>
                  <td>{record.lecture}</td>
                  <td>{record.date}</td>
                  <td>{record.timestart}</td>
                  <td>{record.slot}</td>
                  <td>
                    {isEditing && editingIndex === i ? (
                      <input
                        type="text"
                        value={editedSubject}
                        onChange={(e) => setEditedSubject(e.target.value)}
                      />
                    ) : (
                      record.subject
                    )}
                  </td>
                  <td>{record.duration}</td>
                  <td>
                    {record.status === "Accepted" ? (
                      <div className="text-success">Accepted</div>
                    ) : (
                      <div className="text-danger">Rejected</div>
                    )}
                  </td>
                  <td>
                    {isEditing && editingIndex === i ? (
                      <Button
                        className="mx-2"
                        variant="primary"
                        onClick={() => handleSaveClick(i)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="mx-2"
                        variant="success"
                        onClick={() => handleEditClick(i)}
                        disabled={isEditing}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      //   onClick={() => handleDeleteClick(i)}
                      disabled={isEditing}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </Card.Body>
      </Card>
    </div>
  );
}

export default S_List;
