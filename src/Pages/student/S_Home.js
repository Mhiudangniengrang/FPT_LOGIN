import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";


const S_home = () => {

  return (
    <>
      <S_Layout>
        <OffCanvasSidebar />
        This is student home
      </S_Layout>
    </>
  );

}

export default S_home;
