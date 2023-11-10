import AdminPage from "../Pages/admin/AdminPage";


const AdminRoutes = [
    { path: '/admin', component: AdminPage },
    { path: '/admin/:type', component: AdminPage },
    { path: '/admin/:type/:action', component: AdminPage },
    { path: '/admin/:type/:action/:id', component: AdminPage },
];


export default AdminRoutes;