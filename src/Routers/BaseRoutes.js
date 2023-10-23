import Userhome from "../Pages/userhome/userhome";
import Nopage from "../components/Nopage";
const BaseRoutes = [
    { path: '/', component: Userhome },
    { path: '*', component: Nopage },

];

export default BaseRoutes;