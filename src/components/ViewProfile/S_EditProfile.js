import React, { useState } from "react";
import S_SubjectList from "../SubjectList_userinfo/S_SubjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
function S_EditProfile(props) {
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialize with an empty array for multi-selection
  const [name, setName] = useState(props.currentName); // Initialize the name state with the prop value

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
