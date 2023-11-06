import React, { useState, useEffect, useContext } from "react";
import L_Layout from "../../Layouts/L_Layout";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import BookPublicOverlay from "../../components/Schedule/BookPublicOverlay";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";

import GlobalContext from "../../context/GlobalContext";
import Calender_type from "../../components/Schedule/Calender_type";
import Breadcrumbs from "../../components/BreadcrumpCus";

const path = [
  {
    text: "Home",
    route: "/lecture_home",
  },
  {
    text: "View Schedule",
    route: "/l_view_schedule",
  },
];

const L_Schedule = () => {
  const { showSlotModal } = useContext(GlobalContext);

  return (
    <>
      {showSlotModal && <BookPublicOverlay />}
      <L_Layout>
        <OffCanvasSidebar />
        <Breadcrumbs items={path} />
        <FormSearch />
        <Calender_type />
      </L_Layout>
    </>
  );
};

export default L_Schedule;
