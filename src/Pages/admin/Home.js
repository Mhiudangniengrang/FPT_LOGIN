import React from 'react'
import Style from '../../assets/style/admin.module.scss'
import Nav from './Nav'
import { MajorCreate, MajorEdit, MajorList } from './Major'
import { useParams } from 'react-router-dom'
import { RoomList } from './Room'
import { SubjectList } from './Subject'


function Home({ Toggle }) {
    const { type, action, id } = useParams();
    return (
        <div className={Style.home}>
            <Nav Toggle={Toggle} />
            <div style={{ marginTop: '80px' }}>
                {(type === "major" && !action) && <MajorList />}
                {(type === "major" && action === 'edit' && id) && <MajorEdit />}
                {(type === "major" && action === 'create') && <MajorCreate />}

                {(type === "room" && !action) && <RoomList />}
                {(type === "room" && action === 'edit' && id) && <MajorEdit />}

                {(type === "subject" && !action) && <SubjectList />}
                {(type === "room" && action === 'edit' && id) && <MajorEdit />}
            </div>
        </div >)
}
export default Home