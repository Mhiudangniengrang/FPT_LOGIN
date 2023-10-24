import React, { useEffect, useState } from "react";
import { Container, Form, ListGroup, Button } from "react-bootstrap";
import S_Layout from "../../Layouts/S_Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom"; // Import useHistory
import axios from "../../Services/customizeAxios";

const S_SearchName = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const [searchName, setSearchName] = useState([]);

  const setSelectedSubject = (subject) => {
    // Define the setSelectedSubject function
    // You can set the selected subject here or in your parent component
  };
  useEffect(() => {
    if (searchText === "") {
      console.log("set null");
      setSearchName([]);
    }
  }, [searchText]);
  const handleSearch = async () => {
    await axios
      .get(`/api/v1/student/search/subject`, {
        params: {
          keyword: searchText,
        },
      })
      .then((res) => {
        res.map((result) => {
          setSearchName((prev) => [...prev, result]);
        });
      })
      .catch((error) => {
        console.log("error at searchname:" + error);
      });
  };
  console.log(searchName);
  const handleClickSearch = () => {
    console.log(">>check click");
    history.push("/l_view_profile");
  };

  const handleClickSubject = (subject) => {
    setSelectedSubject(subject); // Call the setSelectedSubject function here
    history.push("/s_course_info");
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

        {searchName.length > 0 && (
          <div>
            <p>Search Results: {searchName.length} result(s) found</p>
          </div>
        )}

        {searchName.length > 0 && (
          <div>
            <ListGroup>
              {searchName.map((teacher, index) => (
                <ListGroup.Item
                  style={{
                    border: "none",
                  }}
                  key={index}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div>Subject: {teacher.subjectId}</div>
                      <div className="mx-4 small ">
                        Teacher: {teacher.lecturerName}
                      </div>
                    </div>
                    <div className="d-flex">
                      Subject:
                      <FontAwesomeIcon
                        className="mx-1 my-1"
                        icon={faCalendarDays}
                      />{" "}
                      <div
                        onClick={() => handleClickSubject(teacher.subjectName)}
                      >
                        {teacher.subjectName}
                      </div>
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
