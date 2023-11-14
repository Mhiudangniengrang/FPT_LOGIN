import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
import { FormGroup, ListGroup, ListGroupItem } from "react-bootstrap";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function S_EditProfile(props) {
  const { loginUser } = props;
  const [majors, setMajors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedMajor) {
      const item = majors.find((major) => major.majorName === selectedMajor);

      console.log(item);

      axios
        .get(`/api/v1/student/searching/subject/major/${item.majorId}`)
        .then((res) => {
          setSubjects(res);
          // console.log(res);
        })
        .catch((error) => {
          console.error("Error", error);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  }, [selectedMajor]);

  const handleClickSubject = (item) => {
    setSelectedSubjects((prevSubjects) => {
      if (prevSubjects.includes(item)) {
        return prevSubjects.filter((subject) => subject !== item);
      } else {
        return [...prevSubjects, item];
      }
    });
  };

  const isActive = (item) => {
    if (selectedSubjects.some((subject) => subject === item)) {
      return "active";
    }
    return "";
  };
  const updateSubjects = async () => {
    try {
      const selectedSubjectsData = selectedSubjects.map((subject) => ({
        lecturerId: loginUser.userId,
        subjectId: subject.subjectId,
      }));

      await axios.post("/api/v1/lecturer/subject", selectedSubjectsData);
      console.log(selectedSubjectsData);
      toast.success("Update profile success");
    } catch (err) {
      console.error("Error creating URL:", err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <FormGroup className="my-3">
        <label htmlFor="major">Major:</label>
        <select
          className="mx-2"
          id="major"
          name="major"
          value={selectedMajor}
          onChange={(e) => {
            setSelectedMajor(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Major
          </option>
          {majors.map((majorOption) => (
            <option key={majorOption.majorId}>{majorOption.majorName}</option>
          ))}
        </select>
      </FormGroup>
      <div className="form-group ">
        <p className="my-3">Your current subjects:</p>
        {subjects.length > 0 && (
          <div className="my-3">
            <strong>
              {" "}
              <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
              {selectedMajor}
            </strong>
            <div className="my-2">
              <ListGroup>
                {subjects.map((result) => (
                  <ListGroupItem
                    onClick={() => handleClickSubject(result)}
                    className={`${isActive(result)}`}
                  >
                    {result.subjectId} - {result.lecturerName}
                    <FontAwesomeIcon className="mx-2" icon={faCircleCheck} />
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
          className="btn btn-primary"
          onClick={updateSubjects}
        >
          Update Profile
        </button>
        <button type="button" className="btn btn-secondary mx-2">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default S_EditProfile;