import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseRoutes from "./Routers/BaseRoutes";
import StudentRoutes from "./Routers/StudentRoutes";
import LecturerRoutes from "./Routers/LecturerRoutes";
import { DataProvider } from "./context/DataContext";
import AdminRoutes from "./Routers/AdminRoutes";
import { Admin, Resource } from "react-admin";
import restProvider from 'ra-data-simple-rest'
import MajorList from "./Pages/admin/MajorList";
import RoomList from "./Pages/admin/RoomList";
import customDataProvider from "./Services/customDataProvider";
function App() {
  const apiUrl = 'http://localhost:8080';
  const dataProvider = customDataProvider(apiUrl); // Create an instance of your custom data provider
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
              <Route key={idx} path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </Router>
      {/* <Admin dataProvider={dataProvider}>
        <Resource name="/api/v1/admin/majors" list={MajorList} />
      </Admin> */}
    </div>
  );
}
export default App;
