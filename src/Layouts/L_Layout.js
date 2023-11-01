import React from "react";
import L_Header from "../components/L_Header";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import { useData } from "../context/DataContext";
import Unauthorize from "../Pages/errors/Unauthorize";

const L_Layout = ({ children }) => {

  const { authorize } = useData()

  return (
    <>
      {authorize !== null && (
        authorize ? (
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
        ) : (
          <Unauthorize />
        )
      )}
    </>
  );
};

export default L_Layout;
