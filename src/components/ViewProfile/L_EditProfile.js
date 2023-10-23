import React, { useState } from "react";
import L_SubjectList from "../SubjectList_userinfo/L_SubjectList";

function L_EditProfile(props) {
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialize with an empty array for multi-selection
  const [name, setName] = useState(props.currentName); // Initialize the name state with the prop value

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

  const handleUpdateProfile = () => {
    // Assuming you have an input field for the name
    // Get the new name value from the 'name' state
    const newName = name;
    props.onUpdateProfile(selectedSubjects);
    // Call the parent component's function to update the name
    props.onUpdateName(newName);
  };
  const handleNameChange = (event) => {
    setName(event.target.value); // Update the 'name' state as the user types
  };
  const handleSearch = (searchTerm) => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };
  const handleSubjectSelection = (subject) => {
    // Kiểm tra xem môn học đã được chọn trước đó chưa
    if (
      !selectedSubjects.some(
        (selectedSubject) => selectedSubject.id === subject.id
      )
    ) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
    // Nếu môn học đã được chọn, bạn có thể xử lý theo ý muốn, ví dụ: thông báo lỗi hoặc không thêm vào danh sách.
    else {
      // Xử lý trường hợp môn học đã được chọn
      // Ví dụ: alert("Môn học đã được chọn trước đó");
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>

      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            onChange={handleNameChange}
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

export default L_EditProfile;
