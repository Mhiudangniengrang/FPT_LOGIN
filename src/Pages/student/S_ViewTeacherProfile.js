import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import S_Layout from "../../Layouts/S_Layout";
import S_ViewTeacherAboutme from "../../components/ViewTeacherProfile/S_ViewTeacherAboutme";
class S_ViewTeacherProfile extends React.Component {
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
                  <FontAwesomeIcon icon={faUser} /> View Teacher Profile
                </Card.Header>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="my-4">
                <Card.Body className="py-2 ">
                  <Row>
                    <Col md={6} className="py-1 ">
                      <h5>ID:</h5>
                      <p>HungLD</p>
                      <h5>Name:</h5>
                      <p>Lai Duc Hung</p>
                      <h5>Email Address:</h5>
                      <p>hungld@fe.fpt.vn</p>
                    </Col>

                    <Col md={6}>
                      <Button
                        variant={activeTab === "aboutMe" ? "success" : "dark"}
                        onClick={() => this.setActiveTab("aboutMe")}
                      >
                        About me
                      </Button>
                      {activeTab === "aboutMe" && <S_ViewTeacherAboutme />}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </S_Layout>
    );
  }
}

export default S_ViewTeacherProfile;
