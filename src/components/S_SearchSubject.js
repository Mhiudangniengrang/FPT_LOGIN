import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import S_Layout from "../Layouts/S_Layout";

const S_SearchSubject = () => {
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([
    {
      courseName: "SWP391",
      teacher: "Lại Đức Hùng",

    },
    { courseName: "SWP391", teacher: "Nguyễn Ngọc Lâm" },
    { courseName: "SWP391", teacher: "Nguyễn Minh Sang" },
    { courseName: "PRN211", teacher: "Nguyễn Thế Hoàng" },
    { courseName: "PRN211", teacher: "Hồ Hoàn Kiếm" },
    { courseName: "PRN211", teacher: "Trương Long" },
    { courseName: "Lab211", teacher: "Nguyễn Trọng Tài" },
    { courseName: "Lab211", teacher: "Lê Vũ Trường" },
    { courseName: "Lab211", teacher: "Nguyễn Trí Thông" },
    { courseName: "CSI104", teacher: "Bùi Thanh Hùng" },
    { courseName: "CSI104", teacher: "Đặng Thu Huyền" },
    { courseName: "CSI104", teacher: "Lại Đức Hùng" },

    // Thêm các môn học khác vào đây
  ]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <S_Layout>
      <div className="my-5">
        <Container >
          <Row>
            <Col md={4}>
              <Card className="my-2">
                <Card.Header>
                  <FontAwesomeIcon className="mx-1" icon={faBriefcase} /> Search Subject
                </Card.Header>
              </Card>
            </Col>
          </Row>
          <InputGroup className=" mb-3 ">
            <FormControl
              placeholder="Search for courses..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>

          <h4>Search Results:</h4>
          {searchResults.length > 0 ? (
            <ListGroup>
              {searchResults.map((course, index) => (
                <ListGroup.Item key={index}>
                  {course.courseName} - {course.teacher}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No results found.</p>
          )}
        </Container>
      </div>
    </S_Layout>
  );
};

export default S_SearchSubject;
