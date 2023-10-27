import React, { useState } from "react";
import S_Layout from "../../Layouts/S_Layout"
import WeeklyCalendar from "../../components/Schedule/Week";
import { Breadcrumb } from "react-bootstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Breadcrumbs from "../../components/BreadcrumpCus";
import { useData } from "../../context/DataContext";

const path = [
    {
        route: '/student',
        text: 'Home',
    },
    {
        route: `/student/search/profileteacher`,
        text: `Hoadh's profile`,
    },
    {
        route: '/student/lecturer/viewschedule',
        text: 'View schedule',
    },
]

const S_ViewTeacherSchedule = () => {

    const [key, setKey] = useState('meeting');
    const { emptySlots } = useData()
    return (
        <>
            <S_Layout>
                <Breadcrumbs items={path} />
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    style={{
                        paddingTop: '30px'
                    }}
                >
                    <Tab eventKey="meeting" title="Meeting Schedule">
                        <WeeklyCalendar isDisable={false} />
                    </Tab>
                    <Tab eventKey="teaching" title="Teaching Schedule">
                        <WeeklyCalendar isDisable={true} />
                    </Tab>
                </Tabs>
            </S_Layout>
        </>
    )
}

export default S_ViewTeacherSchedule