// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';
import MainAdminLayout from '@ecommerce-frontend/src/application/journey/admin/main';
import AuthGuard from '@ecommerce-frontend/src/application/routes/AuthGuard';

// * admin pages
const AdminDashboard = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/Dashboard'))
);
const AdminUsers = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/users/Users')));
// const UserDetail = Loadable(
//     lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/users/UserDetail'))
// );

const AdminCategories = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/categories/Categories'))
);
// const CategoryDetail = Loadable(
//     lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/categories/CategoryDetail'))
// );

const AdminProducts = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/products/Products'))
);
// const ProductDetail = Loadable(
//     lazy(() => import('@ecommerce-frontend/src/application/journey/admin/pages/products/ProductDetail'))
// );

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
        <AuthGuard>
            <MainAdminLayout />
        </AuthGuard>
    ),
    children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'users', element: <AdminUsers /> },
        // { path: 'users/:id', element: <UserDetail /> },
        { path: 'category', element: <AdminCategories /> },
        // { path: 'category/:id', element: <CategoryDetail /> },
        { path: 'products', element: <AdminProducts /> },
        // { path: 'products/:id', element: <ProductDetail /> },
        { path: 'orders', element: <AdminOrders /> },
        { path: 'coupons', element: <AdminCoupons /> }
    ]
};

export default AdminRoutes;
