import S_home from "../Pages/student/S_Home";
import S_Schedule from "../Pages/student/S_Schedule";
import S_UserInfo from "../Pages/student/S_UserInfo";
import S_ViewProfile from "../Pages/student/S_ViewProfile";
import S_ViewTeacherProfile from "../Pages/student/S_ViewTeacherProfile";
import S_ViewTeacherSchedule from "../Pages/student/S_ViewTeacherSchedule";
import S_ViewSearch from "../components/S_SearchTeacher/S_ViewSearch";

const StudentRoutes = [
  { path: "/student", component: S_home },
  { path: "/student/viewinfo", component: S_UserInfo },
  { path: "/student/viewprofile", component: S_ViewProfile },
  { path: "/student/search/profile", component: S_ViewTeacherProfile },
  { path: "/student/lecturer/profile/:lecturerId", component: S_ViewTeacherProfile },
  { path: "/student/lecturer/viewschedule/:lecturerId", component: S_ViewTeacherSchedule },
  { path: "/student/viewschedule", component: S_Schedule },
  { path: "/student/search/:filter/:search", component: S_ViewSearch },
  { path: "/student/search", component: S_ViewSearch },
  { path: "/student/search/lecturer/", component: S_ViewSearch },
  { path: "/student/search/subject/", component: S_ViewSearch },

];

export default StudentRoutes;
