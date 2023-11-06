import React from "react";
import WeeklyCalendar from "../../components/Schedule/Week";
import L_Layout from "../../Layouts/L_Layout";
import Breadcrumbs from "../../components/BreadcrumpCus";

const path = [
    {
        route: '/lecturer',
        text: 'Home',
    },
    {
        route: '/lecturer/teachingschedule',
        text: 'View Teaching Schedule',
    },
]
const L_ViewTeaching = () => {

    return (
        <L_Layout>
            <Breadcrumbs items={path} />
            <WeeklyCalendar isDisable={true} />
        </L_Layout>
    );
};

export default L_ViewTeaching;