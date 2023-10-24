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
import S_Schedule from "./Pages/student/S_Schedule";
import S_ViewTeacherProfile from "./Pages/student/S_ViewTeacherProfile";
import S_UserInfo from "./Pages/student/S_UserInfo";
import L_UserInfo from "./Pages/lecturer/L_UserInfo";
import S_SearchSubject from "./components/S_SearchSubject";
import S_SearchName from "./components/S_SearchTeacher/S_SearchName";
import Calender_type from "./components/Calender_type";
import L_ViewTeaching from "./Pages/lecturer/L_ViewTeaching";
import L_ViewMeeting from "./Pages/lecturer/L_ViewMeeting";
import S_TeacherSubjectInfo from "./components/S_SearchTeacher/S_TeacherSubjectInfo";
import L_Schedule from "./Pages/lecturer/L_Schedule";

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

          <Route path="/calender_type">
            <Calender_type />
          </Route>

          <Route path="/s_user_info">
            <S_UserInfo />
          </Route>
          <Route path="/s_searchsubject">
            <S_SearchSubject />
          </Route>
          <Route path="/s_searchname">
            <S_SearchName />
          </Route>
          <Route path="/s_course_info">
            <S_TeacherSubjectInfo />
          </Route>

          <Route path="/l_user_info">
            <L_UserInfo />
          </Route>
          <Route path="/s_view_profile">
            <S_ViewProfile />
          </Route>
          <Route path="/l_view_profile">
            <L_ViewProfile />
          </Route>
          <Route path="/s_view_schedule">
            <S_Schedule />
          </Route>
          <Route path="/s_view_teacher_profile">
            <S_ViewTeacherProfile />
          </Route>
          <Route path="/l_view_schedule">
            <L_Schedule />
          </Route>
          <Route path="/l_view_teaching_schedule">
            <L_ViewTeaching />
          </Route>
          <Route path="/l_view_meeting_schedule">
            <L_ViewMeeting />
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
