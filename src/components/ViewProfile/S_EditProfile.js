import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
import { FormGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function S_EditProfile(props) {
  const [name, setName] = useState();
  const [major, setMajor] = useState("Select Major");
  const [majorId, setMajorId] = useState(null);
  const [majors, setMajors] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const handleUpdateProfile = () => {
    const newName = name;
    const selectedSubjectsToUpdate = selectedSubjects.filter(
      (subject) => subject.selected
    );

    props.onUpdateProfile({
      name: newName,
      selectedSubjects: selectedSubjectsToUpdate,
    });

    toast.success("Update Successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
        if (response.length > 0) {
          setMajorId(response[0].majorId);
        }
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });
  }, []);

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
    const selectedMajor = majors.find(
      (majorOption) => majorOption.majorName === event.target.value
    );
    if (selectedMajor) {
      setMajorId(selectedMajor.majorId);
    }
  };

  useEffect(() => {
    if (majorId) {
      axios
        .get(`/api/v1/student/searching/subjects/major/${majorId}`)
        .then((res) => {
          setSelectedSubjects(res);
          // console.log(res);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [majorId]);
  const handleClickSubject = (subjectId) => {
    const updatedSubjects = selectedSubjects.map((subject) => {
      if (subject.subjectId === subjectId) {
        return { ...subject, selected: !subject.selected };
      }
      return subject;
    });
    setSelectedSubjects(updatedSubjects);
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={handleNameChange}
        />
      </div>
      <FormGroup>
        <label htmlFor="major">Major:</label>
        <select
          className="mx-2 my-3"
          value={major}
          onChange={handleMajorChange}
        >
          <option value="Select Major" disabled hidden>
            Select Major
          </option>
          {majors.map((majorOption) => (
            <option key={majorOption.majorId}>{majorOption.majorName}</option>
          ))}
        </select>
      </FormGroup>
      <div className="form-group ">
        <p className="my-3">Course:</p>
        {selectedSubjects.length > 0 && (
          <div className="my-3">
            <strong>
              {" "}
              <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
              {major}
            </strong>
            <div className="my-2">
              <ListGroup>
                {selectedSubjects.map((result) => (
                  <ListGroupItem
                    key={result.subjectId}
                    onClick={() => handleClickSubject(result.subjectId)}
                    style={{
                      background: result.selected ? "#a9a9a9" : "transparent",
                    }}
                  >
                    {result.subjectId} - {result.lecturerName}{" "}
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary  "
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
        <button type="button" className="btn btn-secondary mx-2">
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default S_EditProfile;
