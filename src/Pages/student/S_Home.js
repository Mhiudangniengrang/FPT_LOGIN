import React, { useState } from "react";
import S_Layout from "../../Layouts/S_Layout";
import WeeklyCalendar from "../../components/Schedule/Week";

import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "../../components/Schedule/CurrentWeekDatePicker";
class S_home extends React.Component {


  render() {
    return (
      <>
        <S_Layout>
          <WeeklyCalendar />
        </S_Layout>
      </>
    );
  }
}

export default S_home;
