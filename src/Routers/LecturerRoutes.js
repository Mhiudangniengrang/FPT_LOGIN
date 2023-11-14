import L_HelpCenter from "../Pages/lecturer/L_HelpCenter";
import L_home from "../Pages/lecturer/L_Home";
import L_Schedule from "../Pages/lecturer/L_Schedule";
import L_ViewMeeting from "../Pages/lecturer/L_ViewMeeting";
import L_ViewProfile from "../Pages/lecturer/L_ViewProfile";
import L_ViewTeaching from "../Pages/lecturer/L_ViewTeaching";

const LecturerRoutes = [
  { path: "/lecturer", component: L_HelpCenter },
  { path: "/lecturer/dashboard", component: L_home },
  { path: "/lecturer/meetingschedule", component: L_ViewMeeting },
  { path: "/lecturer/teachingschedule", component: L_ViewTeaching },
  { path: "/lecturer/viewprofile", component: L_ViewProfile },
  { path: "/lecturer/viewschedule", component: L_Schedule },
  { path: "/lecturer/help_center", component: L_HelpCenter },
];

export default LecturerRoutes;
