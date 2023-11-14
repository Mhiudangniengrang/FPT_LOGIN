import React, { useState, useEffect, useContext } from "react";
import S_Layout from "../../Layouts/S_Layout";

import "react-datepicker/dist/react-datepicker.css";
import FormSearch from "../../components/FormSearch";
import BookPublicOverlay from "../../components/Schedule/BookPublicOverlay";
import OffCanvasSidebar from "../../components/OffCanvasSidebar";

import GlobalContext from "../../context/GlobalContext";
import Calender_type from "../../components/Schedule/Calender_type";
import Breadcrumbs from "../../components/BreadcrumpCus";
import { useParams } from "react-router-dom";
import StudentOverlay from "../../components/Schedule/StudentOverlay";

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
    const { type } = useParams()
    return (
        <>
            {showSlotModal && <StudentOverlay />}
            <S_Layout>
                <Breadcrumbs items={path} />
                <FormSearch />
                <Calender_type />
            </S_Layout>
        </>
    );

}

export default S_Schedule;
