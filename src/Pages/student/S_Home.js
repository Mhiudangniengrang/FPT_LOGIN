import React from "react";
import S_Layout from "../../Layouts/S_Layout";
import FormSearch from "../../components/FormSearch";
import Connect_section from "../userhome/connect_section";
import WeeklyCalendar from "../../components/Week";

class S_home extends React.Component {

    render() {

        return (
            <>
                <S_Layout>
                    <FormSearch />
                    <WeeklyCalendar />
                </S_Layout>
            </>
        )
    }
}

export default S_home