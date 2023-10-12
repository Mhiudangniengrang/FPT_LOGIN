import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";

import Userhome from "./components/userhome/userhome";
import Nopage from "./components/Nopage";

import "./App.css";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from './Pages/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Userhome from './Pages/userhome/userhome';
import Nopage from './components/Nopage';
import Hero from './components/userhome/section_hero';
import Feature from './Pages/userhome/section_feature';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Userhome />
          </Route>
          <Route path="*">
            <Nopage />
          </Route>
          <Route path="*">
            <Nopage />
          </Route>
          <Route path='/#overview'>
            <Hero />
          </Route>
          <Route path='/#features'>
            <Feature />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
