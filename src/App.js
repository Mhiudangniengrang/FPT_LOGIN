// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";

import Userhome from "./components/userhome/userhome";
import Nopage from "./components/Nopage";
// import Home from "./Information_Nav_Teacher/Home";
// import Nav from "./Navigation_Teacher/Nav";
import "./App.css";
// import "./Header_Teacher/Headers.scss";
import Navi from './components/Navigation_Student/Navi'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Headers_Student from "./components/Header_Student/Headers_Student";
import Home_Student from './components/Information_Nav_Student/Home_Student';
import Meeting_Schedule_Student from './components/Information_Nav_Student/Meeting_Schedule_Student';
import History_Student from './components/Information_Nav_Student/History_Stdudent';
import Help_Center_Student from './components/Information_Nav_Student/Help_Center_Student';
// import Teaching_Schedule from "./Information_Nav_Teacher/Teaching_Schedule";
// import Meeting_Schedule from "./Information_Nav_Teacher/Meeting_Schedule";
// import Help_Center from "./Information_Nav_Teacher/Help_Center";
// import Headers from "./Header_Teacher/Headers";
// import History from "./Information_Nav_Teacher/History";
function App() {
  return (
    // <div className="App">
    //   <Router>
    //     <Switch>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //       <Route exact path="/">
    //         <Userhome />
    //       </Route>
    //       <Route path="*">
    //         <Nopage />
    //       </Route>
    //     </Switch>
    //   </Router>
    // </div>
    // <BrowserRouter>
    //   <div className="App">
    //     {/* <Login/> */}
    //     <Headers />
    //     <Nav />
    //     <Switch>
    //       <Route path="/" exact>
    //         <Home />
    //       </Route>
    //       <Route path="/TeachingSchedule">
    //         <Teaching_Schedule />
    //       </Route>
    //       <Route path="/Meetingschedule">
    //         <Meeting_Schedule />
    //       </Route>
    //       <Route path="/History">
    //         <History />
    //       </Route>
    //       <Route path="/HelpCenter">
    //         <Help_Center />
    //       </Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>
    <BrowserRouter>
      <div className="App">
        {/* <Login/> */}
        <Headers_Student />
        <Navi />
        <Switch>
          <Route path="/" exact>
            <Home_Student/>
          </Route>
          <Route path="/Meetingschedule">
            <Meeting_Schedule_Student />
          </Route>
          <Route path="/History">
            <History_Student />
          </Route>
          <Route path="/HelpCenter">
            <Help_Center_Student />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
