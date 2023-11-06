import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import S_HomeStudent from "../../components/S_HomeStudent";
import axios from "../../Services/customizeAxios";


const S_home = () => {
  return (
    <>
      <S_Layout>
        <FormSearch />
        <S_HomeStudent />
      </S_Layout>
    </>
  );

}

export default S_home;
