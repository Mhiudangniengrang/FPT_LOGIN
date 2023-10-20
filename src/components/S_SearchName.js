import React, { useState } from "react";
import { Container, Form, ListGroup, Button } from "react-bootstrap";
import S_Layout from "../Layouts/S_Layout";
import { TeacherName } from "./S_TeacherName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom"; // Import useHistory

const S_SearchName = () => {
  const [searchText, setSearchText] = useState("");
  const [teachers, setTeachers] = useState(TeacherName);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchText) {
      const foundTeachers = teachers.filter((teacher) =>
        teacher.teacher.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(foundTeachers);
    } else {
      setSearchResults([]);
    }
  };
  const history = useHistory();
  const handleClickSearch = () => {
    console.log(">>check click");
    history.push("/l_view_profile");
  };
  return (
    <S_Layout>
      <Container className="my-5">
        <h1>Teacher Search</h1>

        <Form>
          <Form.Group className="d-flex">
            <Form.Control
              className="w-50"
              type="text"
              placeholder="Search for a teacher or subject"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Form.Group>
        </Form>

        {searchResults.length > 0 && (
          <div>
            <p>Search Results: {searchResults.length} result(s) found</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div>
            <ListGroup>
              {searchResults.map((teacher, index) => (
                <ListGroup.Item
                  style={{
                    border: "none",
                  }}
                  key={index}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Subject: {teacher.subject}</div>
                      <div className="mx-4 small ">
                        Teacher: {teacher.teacher}
                      </div>
                    </div>
                    <div className="d-flex">
                      Subject:
                      <FontAwesomeIcon
                        className="mx-1 my-1"
                        icon={faCalendarDays}
                      />{" "}
                      <div>{teacher.detail}</div>
                      <FontAwesomeIcon
                        className="mx-2 my-1"
                        icon={faMagnifyingGlass}
                        onClick={() => handleClickSearch()}
                      />
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Container>
    </S_Layout>
  );
};

export default S_SearchName;
