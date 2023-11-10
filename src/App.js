import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseRoutes from "./Routers/BaseRoutes";
import StudentRoutes from "./Routers/StudentRoutes";
import LecturerRoutes from "./Routers/LecturerRoutes";
import { DataProvider } from "./context/DataContext";
import PageLoading from "./components/PageLoad";
import AdminPage from "./Pages/admin/AdminPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {StudentRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} exact path={route.path}>
                <DataProvider role={"STUDENT"}>
                  <Page />
                </DataProvider>
              </Route>
            );
          })}
          {LecturerRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} exact path={route.path}>
                <DataProvider role={"LECTURER"}>
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}
export default App;
