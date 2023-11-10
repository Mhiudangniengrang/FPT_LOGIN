import axios from "../../Services/customizeAxios";
import React, { useEffect, useState } from "react";
import Home from "./Home";

import Style from '../../assets/style/admin.module.scss'
import { Sidebar } from "./Sidebar";
import { useData } from "../../context/DataContext";
import Unauthorize from "../errors/Unauthorize";
const AdminPage = () => {
    const { authorize } = useData()
    const [toggle, setToggle] = useState(true)
    const Toggle = () => { setToggle(!toggle) }

    return (

        <div className={`container-fluid min-vh-100 ${Style.wrapper}`} >
            <div className='row '>
                <div className={`${toggle ? "col-4" : "col "} col-md-2  vh-100 position-fixed ${Style.sideBarContainer} ${toggle === false ? Style.mini : ""}`}>
                    <Sidebar Toggle={toggle} />
                </div>
                <div className={`ms-auto ${toggle ? "col-10" : "col"} p-0`}>
                    <Home Toggle={Toggle} />
                </div>
            </div>
        </div >

    )

}

export default AdminPage