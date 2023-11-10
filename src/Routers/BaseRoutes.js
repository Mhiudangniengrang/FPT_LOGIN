import Unauthorize from "../Pages/errors/Unauthorize";
import ErrorPage from "../Pages/errors/errorPage";
import Userhome from "../Pages/userhome/userhome";
import Nopage from "../components/Nopage";
const BaseRoutes = [
    { path: '/', component: Userhome },
    { path: '/unauthorize', component: Unauthorize },
    { path: '*', component: ErrorPage },

];

export default BaseRoutes;