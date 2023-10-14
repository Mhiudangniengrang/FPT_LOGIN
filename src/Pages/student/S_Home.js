import React from "react";
import S_Layout from "../../Layouts/S_Layout";
<<<<<<< HEAD

class S_home extends React.Component {

    render() {

        return (
            <>
                <S_Layout>
                    <h1>Hello student home</h1>
                </S_Layout>
            </>
        )
    }
}

export default S_home
=======
import { Button, Card } from "react-bootstrap";
import FormSearch from "../../components/FormSearch";
import Connect_section from "../userhome/connect_section";
import WeeklyCalendar from "../../components/Week";

class S_home extends React.Component {
  

  render() {
    return (
      <>
        <S_Layout>
          <div>HOME</div>
        </S_Layout>
      </>
    );
  }
}

export default S_home;
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
