// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';
import MainAdminLayout from '@ecommerce-frontend/src/application/journey/admin/main';
import AuthGuardAdmin from '@ecommerce-frontend/src/application/routes/AuthGuardAdmin';

// * admin pages
const AdminDashboard = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/Dashboard'))
);
const AdminUsers = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/users')));

const AdminCategories = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/categories'))
);

const AdminProducts = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/products')));
const AdminProductDetail = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/products/ProductDetail'))
);

const AdminOrders = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/orders/Orders'))
);

const AdminCoupons = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/coupons/Coupons'))
);
// ==============================|| ADMIN DASHBOARD ROUTING ||============================== //

const AdminRoutes = {
    path: '/admin',
    element: (
        <AuthGuardAdmin>
            <MainAdminLayout />
        </AuthGuardAdmin>
    ),
    children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'categories', element: <AdminCategories /> },
        { path: 'products', element: <AdminProducts /> },
        { path: 'products/:id', element: <AdminProductDetail /> },
        { path: 'orders', element: <AdminOrders /> },
        { path: 'coupons', element: <AdminCoupons /> }
    ]
};

export default AdminRoutes;
