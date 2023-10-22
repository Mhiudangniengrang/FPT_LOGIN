import React from "react";
import WeeklyCalendar from "../../components/Schedule/Week";
import L_Layout from "../../Layouts/L_Layout";
import Breadcrumbs from "../../components/BreadcrumpCus";



const path = [
    {
        route: '/lecturer_home',
        text: 'Home',
    },
    {
        route: '/l_view_teaching_schedule',
        text: 'View Teaching Schedule',
    },
]
const L_ViewTeaching = () => {

    return (
        <L_Layout>
            <Breadcrumbs items={path} />
            <WeeklyCalendar />
        </L_Layout>
    );
};

export default L_ViewTeaching;