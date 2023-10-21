import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import S_SubjectList from "../../components/SubjectList_userinfo/S_SubjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
function S_EditProfile(props) {
  const [description, setDescription] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialize with an empty array for multi-selection

  const subjects = [
    { id: 1, name: "SWP391 - Lại Đức Hùng" },
    { id: 2, name: "PRN211 - Nguyễn Thế Hoàng" },
    { id: 3, name: "PRF192 - Lê Thanh Tùng" },
    { id: 4, name: "SWR302 - Đỗ Tấn Nhàn" },
    { id: 5, name: "CSD201 - Thân Văn Sử" },
    { id: 6, name: "CEA201 - Bùi Anh Tuấn" },
    { id: 7, name: "JPD113 - Trần Anh Kiều" },
    { id: 8, name: "JPD123 - Nguyễn Hoàng Hiếu" },
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

          <S_SubjectList
            subjects={filteredSubjects}
            onSearch={handleSearch}
            onSubjectSelect={handleSubjectSelection}
          />
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
      </form>
    </div>
  );
}

export default S_EditProfile;
