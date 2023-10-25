import React from "react";
import L_Header from "../components/L_Header";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const L_Layout = ({ children }) => {
  const { setRole, showSlotModal } = useContext(GlobalContext);
  useEffect(() => {
    setRole("lecturer");
  }, []);
  return (
    <Container
      fluid
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <L_Header />
      <Container
        style={{
          flex: "1",
        }}
      >
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

export default L_Layout;
