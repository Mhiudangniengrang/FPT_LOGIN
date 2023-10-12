

import 'bootstrap/dist/css/bootstrap.min.css';
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
      <Router>
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
          <Route path='/#overview'>
            <Hero />
          </Route>
          <Route path='/#features'>
            <Feature />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
