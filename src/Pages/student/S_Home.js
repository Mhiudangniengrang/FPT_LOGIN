import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import BookPublicOverlay from "../../components/Schedule/BookPublicOverlay";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";
import Month from "../../components/Schedule/Month";

import { getMonth } from "../../Utils/dateUtils";
import GlobalContext from "../../context/GlobalContext";


const S_home = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showSlotModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <>
      {showSlotModal && <BookPublicOverlay />}
      <S_Layout>
        <OffCanvasSidebar />
        <FormSearch />
        <Month month={currenMonth} />
      </S_Layout>
    </>
  );

}

export default S_home;
