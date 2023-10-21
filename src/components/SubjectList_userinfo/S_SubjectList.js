import React, { useState, useEffect } from "react";
import { ListGroup, FormControl, Button } from "react-bootstrap";

function S_SubjectList({ subjects, onSearch, onSubjectSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSearchTerm(subject.name);
    onSubjectSelect(subject); // Pass the selected subject to the parent
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
    filterSubjects(value);
  };

  const handleClickSearch = () => {
    onSearch(searchTerm);
    filterSubjects(searchTerm);
  };

  const filterSubjects = (term) => {
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().startsWith(term.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  // Handle clicking on a subject to autofill the search input

  useEffect(() => {
    if (selectedSubject) {
      // Clear selected subject after a short delay to allow selecting it again
      const timeoutId = setTimeout(() => {
        setSelectedSubject(null);
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedSubject]);

  return (
    <div>
      <div className="d-flex align-items-center">
        <FormControl
          type="text"
          className="w-75 my-3 "
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          className="mx-1 py-2 text-end"
          variant="secondary"
          onClick={handleClickSearch}
        >
          Submit
        </Button>
      </div>
      {filteredSubjects.length > 0 && (
        <ListGroup className="w-75">
          {filteredSubjects.map((subject) => (
            <ListGroup.Item
              key={subject.id}
              onClick={() => handleSubjectClick(subject)} // Handle click on subject
              className={selectedSubject === subject ? "active" : ""}
            >
              {subject.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default S_SubjectList;
