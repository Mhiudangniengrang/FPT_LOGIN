import React, { useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const S_TeacherSubjectInfo = ({ selectedSubject }) => {
  // Map subjects to teachers
  const subjectToTeachers = {
    "CEA201 - Computer Organization and Architecture": [
      "Lại Đức Hùng",
      "Nguyễn Thế Hoàng",
      // Add more teachers for this subject
    ],
    "CSI105 - Computer Organization and Architecture": [
      "Lê Thanh Tùng",
      "Đỗ Tấn Nhàn",
      // Add more teachers for this subject
    ],
    // Add more subjects and their respective teachers
  };

  // Get the list of teachers for the selected subject
  const teachers = subjectToTeachers[selectedSubject] || [];

  return (
    <Container>
      <Card>
        <Card.Header>Thông tin môn học</Card.Header>
        <Card.Body>
          <Card.Title>{selectedSubject}</Card.Title>
          <Card.Text>Thông tin môn học khác (nếu cần)</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Header>Danh sách giáo viên dạy môn này</Card.Header>
        <ListGroup>
          {teachers.map((teacher, index) => (
            <ListGroup.Item key={index}>{selectedSubject} - {teacher}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default S_TeacherSubjectInfo;
