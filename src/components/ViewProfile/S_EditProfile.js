import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarDays,
  faBriefcase,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
import { Col, FormGroup, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "../../context/DataContext";
import S_Course from "./S_Course";
function S_EditProfile() {
  const { loginUser } = useData()
  const [name, setName] = useState(loginUser.userName);
  const [majorId, setMajorId] = useState(loginUser.majorId ? loginUser.majorId : null);
  const [selectedMajor, setSelectedMajor] = useState({});
  const [majors, setMajors] = useState([]);
  const [subject, setSubject] = useState([]);
  const [err, isErr] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState([]);
  const handleUpdateProfile = () => {

  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
        const id = toast.loading("Getting subjects...")
        axios
          .get(`/api/v1/students/${loginUser.userId}/subjects/lecturers`)
          .then(res => {
            setSelectedSubject(res)
            isErr(false)
            toast.update(id, { render: "Get subjects complete", type: "success", isLoading: false, autoClose: true });
          }).catch(error => {
            console.log("Error at getting subject", error)
            toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
            isErr(true)
          })
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });

  }, []);

  useEffect(() => {
    setSubject([])
    axios
      .get(`/api/v1/student/searching/subject/major/${majorId}`)
      .then(res => {
        console.log(res)
        setSubject(res)
        isErr(false)
      }).catch(error => {
        console.log("Error at getting subject", error)
        isErr(true)
      })
  }, [majorId])

  const handleMajorChange = (item) => {
    setMajorId(item.split('-')[0])
    setSelectedMajor({
      majorId: item.split('-')[0],
      majorName: item.split('-')[1]
    })
  };
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
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <FormGroup>
        <label htmlFor="major">Major:</label>
        <select
          className="mx-2 my-3"
          onChange={e => handleMajorChange(e.target.value)}
        >
          <option value="Select Major" disabled hidden>
            Select Major
          </option>
          {majors.map((majorOption) => (
            <option key={majorOption.majorId}
              value={`${majorOption.majorId}-${majorOption.majorName}`}>{majorOption.majorName}</option>
          ))}
        </select>
      </FormGroup>
      <Row style={{ marginBottom: '10px' }}>
        <Col md={6}>
          <p className="pb-1"><strong>Your Current Subjects:</strong></p>
          <Stack gap={3}>
            {selectedSubject.map(item => (
              <Stack direction="horizontal" >
                <FontAwesomeIcon icon={faBriefcase} style={{ color: "#000000", paddingRight: "10px" }} />

                <p key={item.subjectId} className="m-0">{item.subjectId} - {item.unique}</p>
                <FontAwesomeIcon className="ms-auto me-5" icon={faTrash} />

              </Stack>
            ))}
            {err && <p>There is no subject for this student</p>}
          </Stack>
        </Col>
        <Col >
          <p className="pb-1"><strong>{selectedMajor.majorName}:</strong></p>
          <Stack gap={3}>
            {subject.map(item => (
              <Stack direction="horizontal" >
                <FontAwesomeIcon icon={faBriefcase} style={{ color: "#000000", paddingRight: "10px" }} />

                <p key={item.subjectId} className="m-0">{item.subjectId} - {item.unique}</p>
                <FontAwesomeIcon className="ms-auto me-5" icon={faCircleCheck} />
              </Stack>
            ))}
            {err && <p>There is no subject for this major</p>}
          </Stack>
        </Col>
      </Row>

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
