import ErrorPage from "../Pages/errors/errorPage";
import Userhome from "../Pages/userhome/userhome";
import Nopage from "../components/Nopage";
const BaseRoutes = [
    { path: '/', component: Userhome },
    { path: '/error', component: ErrorPage },
    { path: '*', component: ErrorPage },

];

export default BaseRoutes;