import React, { useState } from "react";
import S_Layout from "../../Layouts/S_Layout";
import WeeklyCalendar from "../../components/Schedule/Week";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import FormOverlay from "../../components/Schedule/FormOverlay";
class S_home extends React.Component {


  render() {
    return (
      <>
        <S_Layout>
          <FormSearch />
          <WeeklyCalendar />
          <FormOverlay />
        </S_Layout>
      </>
    );
  }
}

export default S_home;
