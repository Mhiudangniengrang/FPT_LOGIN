import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import L_SubjectList from "../../components/SubjectList_userinfo/L_SubjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
function L_EditProfile(props) {
  const [description, setDescription] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialize with an empty array for multi-selection

  const subjects = [
    { id: 1, name: "CSI104 - Introduction to Computing" },
    { id: 2, name: "SWT301 - Software Testing" },
    { id: 3, name: "SWE102 - Introduction to Software Engineering" },
    { id: 4, name: "SWR301 - Software Requirement" },
    { id: 5, name: "SWP391 - Application Development Project" },
    { id: 6, name: "CEA201 - Computer Organization and Architecture" },
    { id: 7, name: "PRF192 - Programming Fundamentals Using C" },
    { id: 8, name: "SWT301 - Software Testing" },
    // Add more subjects here
  ];
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateProfile = () => {
    props.onUpdateProfile(description, selectedSubjects);
  };

  const handleSearch = (searchTerm) => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };
  const handleSubjectSelection = (subject) => {
    setSelectedSubjects([...selectedSubjects, subject]);
  };

  return (
    <div>
      <h3>Edit Profile</h3>

      <form>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label>Course:</label>

          {selectedSubjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}

          <L_SubjectList
            subjects={filteredSubjects}
            onSearch={handleSearch}
            onSubjectSelect={handleSubjectSelection}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default L_EditProfile;
