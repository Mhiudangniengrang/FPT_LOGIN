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

    const handleTabSelect = (selectedKey) => {
        setKey(selectedKey);
    };
    const { showSlotModal } = useContext(GlobalContext)
    return (
        <>
            {showSlotModal && <BookPublicOverLay />}
            <S_Layout>
                <Breadcrumbs items={path} />
                <Tabs
                    activeKey={key}
                    onSelect={e => handleTabSelect(e)}
                    className="mb-3"
                    style={{
                        paddingTop: '30px'
                    }}
                >
                    <Tab eventKey="meeting" title="Meeting Schedule" >
                        {key === 'meeting' && (<S_WeeklyCalendar activeTab={key} />)}
                    </Tab>
                    <Tab eventKey="teaching" title="Teaching Schedule">
                        {key === 'teaching' && (<S_WeeklyCalendar activeTab={key} />)}
                    </Tab>
                </Tabs>
            </S_Layout>
        </>
    )
}

export default S_ViewTeacherSchedule