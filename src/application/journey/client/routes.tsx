// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';
import AuthGuard from '@ecommerce-frontend/src/application/routes/AuthGuard';
import MainClient from '@ecommerce-frontend/src/application/journey/client/main';

// client page
const WelcomePage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Welcome')));
const ProductPage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Product')));
const ProductDetailPage = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/ProductDetail'))
);
const ProfilePage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/layouts/client/Profile')));
const ProductCategoryPage = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Product'))
);
const ContactPage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Contact')));
const CheckoutPage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Checkout')));

// ==============================|| CLIENT ROUTING ||============================== //

const ClientRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainClient />
        </AuthGuard>
    ),
    children: [
        { index: true, element: <WelcomePage /> },
        { path: 'welcome', element: <WelcomePage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'products', element: <ProductPage /> },
        { path: 'products/:id', element: <ProductDetailPage /> },
        { path: 'products/category/:id', element: <ProductCategoryPage /> },
        { path: 'profile/:id', element: <ProfilePage /> },
        { path: 'checkout', element: <CheckoutPage /> }
    ]
};

export default ClientRoutes;
