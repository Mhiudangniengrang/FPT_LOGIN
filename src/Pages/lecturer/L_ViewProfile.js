import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  CardBody,
} from "react-bootstrap";
import L_Aboutme from "../../components/ViewProfile/S_Aboutme";
import L_EditProfile from "../../components/ViewProfile/S_EditProfile";
import L_Course from "../../components/ViewProfile/L_Course";
import L_Layout from "../../Layouts/S_Layout";

class L_ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "aboutMe",
      description: "", // Initialize description and interest in S_ViewProfile state
      interest: "",
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleUpdateProfile = (description, interest) => {
    // Update the description and interest in S_ViewProfile state
    this.setState({ description, interest });
  };

  render() {
    const { activeTab, description, interest } = this.state;

    return (
      <L_Layout>
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
                <Card.Body className="py-2">
                  <Row>
                    <Col md={6} className="py-1">
                      <h5>Name:</h5>
                      <p>Hungld FU HCM Lại Đức Hùng</p>
                      <h5>Email Address:</h5>
                      <p>HungLD@fpt.edu.vn</p>
                    </Col>
                    <Col md={6}>
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
                        variant={
                          activeTab === "editprofile" ? "success" : "dark"
                        }
                        onClick={() => this.setActiveTab("editprofile")}
                      >
                        Edit profile
                      </Button>
                      <Card className="my-3">
                        <CardBody>
                          {activeTab === "aboutMe" && (
                            <L_Aboutme
                              description={description}
                              interest={interest}
                            />
                          )}
                          {activeTab === "course" && <L_Course />}
                          {activeTab === "editprofile" && (
                            <L_EditProfile
                              onUpdateProfile={this.handleUpdateProfile}
                            />
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </L_Layout>
    );
  }
}

export default L_ViewProfile;
