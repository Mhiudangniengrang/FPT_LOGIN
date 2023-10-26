import React, { useState } from "react";
import data from "../../S_Data.json"; // Replace with the correct path to your data file
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col } from "react-bootstrap";
import S_Layout from "../../Layouts/S_Layout";

function S_SearchName() {
  // Filter data to include only items with the same date as currentDate
  const relatedCourses = [
    {
      id: 1,
      name: "PRN211-Lập trình Cross-Platform với .Net",
      instructor: "SWP391-Lai Duc Hung",
    },
    {
      id: 2,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 3,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 4,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 5,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 6,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },

    // Thêm các khóa học khác tại đây
  ];
  return (
    <S_Layout>
      <div>
        <div>
          <Row>
            <h2 className="mb-1">Related Courses</h2>
          </Row>
          <Row>
            {relatedCourses.map((course) => (
              <Col key={course.id} md={4}>
                <Card
                  className="my-2"
                  style={{ width: "100%", paddingTop: "100px" }}
                >
                  <Card.Body className="pt-5 border-top">
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>Instructor: {course.instructor}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </S_Layout>
  );
}

export default S_SearchName;
