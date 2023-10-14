import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

<<<<<<< HEAD
import Login from './Pages/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Userhome from './Pages/userhome/userhome';
import Nopage from './components/Nopage';
import L_home from './Pages/lecturer/L_Home';
import S_home from './Pages/student/S_Home';
=======
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
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
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
<<<<<<< HEAD
          <Route path='/lecturer_home'>
            <L_home />
          </Route>
          <Route path='/student_home'>
            <S_home />
=======
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
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
          </Route>
          <Route path="*">
            <Nopage />
          </Route>
<<<<<<< HEAD


=======
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
        </Switch>
      </Router>
    </div>
  );
}

export default App;
