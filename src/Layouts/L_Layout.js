import React, { useContext } from "react";
import L_Header from "../components/Headers & Footers/L_Header";
import Footer from "../components/Headers & Footers/Footer";
import Container from "react-bootstrap/Container";
import GlobalContext from "../context/GlobalContext";
import LecturerOverlay from "../components/Schedule/LecturerOverlay";

const L_Layout = ({ children }) => {
  const { showSlotModal } = useContext(GlobalContext)
  return (
    <>
      {showSlotModal && <LecturerOverlay />}
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
