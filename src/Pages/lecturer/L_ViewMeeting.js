import React, { useContext, useEffect } from "react";
import L_Layout from "../../Layouts/L_Layout";
import Calender_type from "../../components/Schedule/Calender_type";
import Breadcrumbs from "../../components/BreadcrumpCus";


const path = [
    {
        route: '/lecturer',
        text: 'Home',
    },
    {
        route: '/lecturer/meetingschedule',
        text: 'View Meeting Schedule',
    },
]
const L_ViewMeeting = () => {
    return (
        <L_Layout>
            <Breadcrumbs items={path} />
            <Calender_type />
        </L_Layout>
    );
};

export default L_ViewMeeting;