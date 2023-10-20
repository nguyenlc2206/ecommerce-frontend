// import libs
import { lazy } from 'react';

// import projects
import Authentication from '@ecommerce-frontend/src/application/journey/auth/main';
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';

// auth page
const LoginAuth = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/auth/pages/Login')));
const RegisterAuth = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/auth/pages/Register')));
const ChangePasswordAuth = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/auth/pages/ChangePassword'))
);
const ForgotPasswordAuth = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/auth/pages/ForgotPassword'))
);
const VerifyOTPAuth = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/auth/pages/VerifyOTP')));

// ==============================|| AUTHENTICAITON ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Authentication />,
    children: [
        { path: '/login', element: <LoginAuth /> },
        { path: '/register', element: <RegisterAuth /> },
        { path: '/change-password', element: <ChangePasswordAuth /> },
        { path: '/forgot-password', element: <ForgotPasswordAuth /> },
        { path: '/forgot-password/verify', element: <VerifyOTPAuth /> }
    ]
};

export default AuthenticationRoutes;
