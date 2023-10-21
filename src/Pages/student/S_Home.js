import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";
import FormSearch from "../../components/FormSearch";


const S_home = () => {

  return (
    <>
      <S_Layout>
        <OffCanvasSidebar />
        <FormSearch />
        List
      </S_Layout>
    </>
  );

}

export default S_home;
