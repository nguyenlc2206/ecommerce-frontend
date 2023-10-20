// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';
import MainAdminLayout from '@ecommerce-frontend/src/application/journey/admin/main';

// * admin pages
const AdminDashboard = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/Dashboard'))
);
const AdminUsers = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/users/Users')));
const UserDetail = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/users/UserDetail'))
);

// ==============================|| ADMIN DASHBOARD ROUTING ||============================== //

const AdminRoutes = {
    path: '/admin',
    element: <MainAdminLayout />,
    children: [
        { path: '', index: true, element: <AdminDashboard /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'users/:id', element: <UserDetail /> }
    ]
};

export default AdminRoutes;
