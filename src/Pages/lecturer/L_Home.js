import React from "react";
import L_Layout from "../../Layouts/L_Layout";
import S_HomeTeacher from "../../components/L_HomeTeacher";

class L_home extends React.Component {
  render() {
    return (
      <>
        <L_Layout>
          <S_HomeTeacher />
        </L_Layout>
      </>
    );
  }
}

export default L_home;
