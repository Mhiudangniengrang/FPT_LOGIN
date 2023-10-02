
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Userhome from './components/userhome/userhome';
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
