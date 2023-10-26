import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseRoutes from "./Routers/BaseRoutes";
import StudentRoutes from "./Routers/StudentRoutes";
import LecturerRoutes from "./Routers/LecturerRoutes";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {StudentRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                exact path={route.path}
              >
                <DataProvider>
                  <Page />
                </DataProvider>
              </Route>
            );
          })}
          {LecturerRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                exact path={route.path}
              >
                <DataProvider>
                  <Page />
                </DataProvider>
              </Route>
            );
          })}
          {BaseRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} exact path={route.path}>
                <Page />
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
