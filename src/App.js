import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseRoutes from "./Routers/BaseRoutes";
import StudentRoutes from "./Routers/StudentRoutes";
import LecturerRoutes from "./Routers/LecturerRoutes";
import { DataProvider } from "./context/DataContext";
import AdminRoutes from "./Routers/AdminRoutes";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {StudentRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                path={route.path}
                element={<DataProvider role={"STUDENT"}><Page /></DataProvider>}
              />
            );
          })}
          {LecturerRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                path={route.path}
                element={<DataProvider role={"LECTURER"}><Page /></DataProvider>}
              />
            );
          })}
          {BaseRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} path={route.path} element={<Page />} />
            );
          })}
          {AdminRoutes.map((route, idx) => {
            const Page = route.component;
            return (
              <Route key={idx} path={route.path}
                element={<DataProvider role={"ADMIN"}><Page /></DataProvider>}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
