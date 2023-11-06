import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import BookPublicOverlay from "../../components/Schedule/BookPublicOverlay";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";

import GlobalContext from "../../context/GlobalContext";
import Calender_type from "../../components/Schedule/Calender_type";
import Breadcrumbs from "../../components/BreadcrumpCus";

const path = [
    {
        text: 'Home',
        route: '/student'
    },
    {
        text: 'View Schedule',
        route: '/student/viewschedule'
    },
]

const S_Schedule = () => {
    const { showSlotModal } = useContext(GlobalContext);

    return (
        <>
            {showSlotModal && <BookPublicOverlay />}
            <S_Layout>
                <OffCanvasSidebar />
                <Breadcrumbs items={path} />
                <FormSearch />
                <Calender_type />
            </S_Layout>
        </>
    );

}

export default S_Schedule;
