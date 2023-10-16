import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Login from "./Pages/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Userhome from "./Pages/userhome/userhome";
import Nopage from "./components/Nopage";
import L_home from "./Pages/lecturer/L_Home";
import S_home from "./Pages/student/S_Home";
import S_ViewProfile from "./Pages/student/S_ViewProfile";
import L_ViewProfile from "./Pages/lecturer/L_ViewProfile";
import S_UserForm from "./Pages/student/S_UserForm";
import Calender_type from "./components/Calender_type";
import WeeklyCalendar from "./components/Week";
import L_UserForm from "./Pages/lecturer/L_UserForm";
import List from "./components/List/S_List";
import S_Calender_type from "./components/List/S_Calender_type";
import L_Calender_type from "./components/List/L_Calender_type";
import S_ViewTeacherProfile from "./Pages/student/S_ViewTeacherProfile";
import S_UserInfo from "./Pages/student/S_UserInfo";
import L_UserInfo from "./Pages/lecturer/L_UserInfo";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Userhome />
          </Route>
          <Route path="/lecturer_home">
            <L_home />
          </Route>
          <Route path="/student_home">
            <S_home />
          </Route>
          <Route path="/s_userform">
            <S_UserForm />
          </Route>
          <Route path="/s_user_info">
            <S_UserInfo />
          </Route>

          <Route path="/l_userform">
            <L_UserForm />
          </Route>
          <Route path="/l_user_info">
            <L_UserInfo />
          </Route>
          <Route path="/calender_type">
            <Calender_type />
          </Route>
          <Route path="/s_calender_type">
            <S_Calender_type />
          </Route>
          <Route path="/l_calender_type">
            <L_Calender_type />
          </Route>
          <Route path="/s_view_profile">
            <S_ViewProfile />
          </Route>
          <Route path="/l_view_profile">
            <L_ViewProfile />
          </Route>
          <Route path="/s_view_teacher_profile">
            <S_ViewTeacherProfile />
          </Route>
          <Route path="*">
            <Nopage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
