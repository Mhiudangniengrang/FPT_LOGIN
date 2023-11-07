import React, { useContext, useState } from "react";
import S_Layout from "../../Layouts/S_Layout"
import WeeklyCalendar from "../../components/Schedule/Week";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Breadcrumbs from "../../components/BreadcrumpCus";
import GlobalContext from "../../context/GlobalContext";
import BookPublicOverLay from "../../components/Schedule/BookPublicOverlay"
import { useParams } from "react-router-dom";
import S_WeeklyCalendar from "../../components/Schedule/S_Week";

const S_ViewTeacherSchedule = () => {
    const { lecturerId } = useParams()
    const path = [
        {
            route: '/student',
            text: 'Home',
        },
        {
            route: `/student/lecturer/profile/${lecturerId}`,
            text: `Lecturer's profile`,
        },
        {
            route: '/student/lecturer/viewschedule',
            text: 'View schedule',
        },
    ]

    const [key, setKey] = useState('meeting');
    const { showSlotModal } = useContext(GlobalContext)
    return (
        <>
            {showSlotModal && <BookPublicOverLay />}
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
                        <S_WeeklyCalendar />
                    </Tab>
                    <Tab eventKey="teaching" title="Teaching Schedule">
                        <S_WeeklyCalendar />
                    </Tab>
                </Tabs>
            </S_Layout>
        </>
    )
}

export default S_ViewTeacherSchedule