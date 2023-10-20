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
import S_Schedule from "./Pages/student/S_Schedule";
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

          <Route path="/s_view_profile">
            <S_ViewProfile />
          </Route>
          <Route path="/l_view_profile">
            <L_ViewProfile />
          </Route>
          <Route path="/s_view_schedule">
            <S_Schedule />
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
