import S_home from "../Pages/student/S_Home";
import S_Schedule from "../Pages/student/S_Schedule";
import S_UserInfo from "../Pages/student/S_UserInfo";
import S_ViewProfile from "../Pages/student/S_ViewProfile";
import S_ViewTeacherProfile from "../Pages/student/S_ViewTeacherProfile";
import S_ViewTeacherSchedule from "../Pages/student/S_ViewTeacherSchedule";
import S_SearchSubject from "../components/S_SearchSubject";
import S_SearchName from "../components/S_SearchTeacher/S_SearchName";

const StudentRoutes = [
  { path: "/student", component: S_home },
  { path: "/student/viewinfo", component: S_UserInfo },
  { path: "/student/viewprofile", component: S_ViewProfile },
  { path: "/student/search/profile", component: S_ViewTeacherProfile },
  { path: "/student/lecturer/profile/:lecturerId", component: S_ViewTeacherProfile },
  { path: "/student/lecturer/viewschedule/:lecturerId", component: S_ViewTeacherSchedule },
  { path: "/student/viewschedule", component: S_Schedule },

];

export default StudentRoutes;
