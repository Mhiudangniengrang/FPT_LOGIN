import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";

import Userhome from "./components/userhome/userhome";
import Nopage from "./components/Nopage";

import "./App.css";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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
        </Switch>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
