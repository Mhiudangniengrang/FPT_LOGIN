import S_home from "../Pages/student/S_Home";
import S_Schedule from "../Pages/student/S_Schedule";
import S_UserInfo from "../Pages/student/S_UserInfo";
import S_ViewProfile from "../Pages/student/S_ViewProfile";
import S_ViewTeacherProfile from "../Pages/student/S_ViewTeacherProfile";
import HelpCenter from "../Pages/student/S_HelpCenter";
import S_ViewSearch from "../components/S_SearchTeacher/S_ViewSearch";
import S_ViewTeacherSchedule from "../Pages/student/S_ViewTeacherSchedule";
import S_HelpCenter from "../Pages/student/S_HelpCenter";
import S_ReportError from "../Pages/student/S_ReportError";

const StudentRoutes = [
  { path: "/student", component: S_HelpCenter },
  { path: "/student/dashboard", component: S_home },
  { path: "/student/viewinfo", component: S_UserInfo },
  { path: "/student/viewprofile", component: S_ViewProfile },
  { path: "/student/search/profile", component: S_ViewTeacherProfile },
  {
    path: "/student/lecturer/profile/:lecturerId",
    component: S_ViewTeacherProfile,
  },
  {
    path: "/student/lecturer/viewschedule/:lecturerId",
    component: S_ViewTeacherSchedule,
  },

  { path: "/student/viewschedule", component: S_Schedule },
  { path: "/student/viewschedule/:type", component: S_Schedule },
  { path: "/student/search/:filter/:search", component: S_ViewSearch },
  { path: "/student/search", component: S_ViewSearch },
  { path: "/student/help_center", component: S_ReportError },
];

export default StudentRoutes;
