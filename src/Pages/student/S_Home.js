import React, { useState } from "react";
import S_Layout from "../../Layouts/S_Layout";
import WeeklyCalendar from "../../components/Schedule/Week";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import BookPublicOverlay from "../../components/Schedule/BookPublicOverlay";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";
import BookPrivateOverlay from "../../components/Schedule/BookPrivateOverlay";
import Month from "../../components/Schedule/Month";

class S_home extends React.Component {


  render() {
    return (
      <>
        <S_Layout>
          <OffCanvasSidebar />
          <FormSearch />
          <Month />
        </S_Layout>
      </>
    );
  }
}

export default S_home;
