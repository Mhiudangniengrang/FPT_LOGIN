import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import S_Aboutme from "../../components/ViewProfile/S_Aboutme";
import S_EditProfile from "../../components/ViewProfile/S_EditProfile";
import S_Course from "../../components/ViewProfile/S_Course";
import S_Layout from "../../Layouts/S_Layout";
import student from "../../assets/image/student.jpg";
class S_ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "aboutMe", // Initial active tab is About Me
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <S_Layout>
        <Container>
          <Row>
            <Col md={4}>
              <Card className="my-2">
                <Card.Header>
                  <FontAwesomeIcon icon={faUser} /> View Profile
                </Card.Header>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="my-4">
                <Card.Body className="py-2 ">
                  <Row>
                    <Col md={3}>
                      <Image
                        className="py-3"
                        src={student}
                        alt="User Image"
                        fluid
                      />
                    </Col>
                    <Col md={9} className="py-3">
                      <h5>Name:</h5>
                      <p>Duong Minh Hieu(K16-HCM)</p>
                      <h5>Email:</h5>
                      <p>hieudmse161153@fpt.edu.vn</p>
                    </Col>
                  </Row>
                  <Button
                    variant={activeTab === "aboutMe" ? "success" : "dark"}
                    onClick={() => this.setActiveTab("aboutMe")}
                  >
                    About me
                  </Button>
                  <Button
                    className="px-3 mx-2"
                    variant={activeTab === "course" ? "success" : "dark"}
                    onClick={() => this.setActiveTab("course")}
                  >
                    Course
                  </Button>
                  <Button
                    variant={activeTab === "editprofile" ? "success" : "dark"}
                    onClick={() => this.setActiveTab("editprofile")}
                  >
                    Edit profile
                  </Button>
                  <Col md={8} className="py-3">
                    {activeTab === "aboutMe" && <S_Aboutme />}
                    {activeTab === "course" && <S_Course />}
                    {activeTab === "editprofile" && <S_EditProfile />}
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </S_Layout>
    );
  }
}

export default S_ViewProfile;
