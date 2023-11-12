import React from "react";
import L_Header from "../components/Headers & Footers/L_Header";
import Footer from "../components/Headers & Footers/Footer";
import Container from "react-bootstrap/Container";

const L_Layout = ({ children }) => {
  return (
    <>
      <Container
        fluid
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <>
          <L_Header />
          <Container
            style={{
              flex: "1",
            }}
          >
            {children}
          </Container>
          <Footer />
        </>
      </Container>
    </>
  );
};

export default L_Layout;
