// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';
import MainClient from '@ecommerce-frontend/src/application/journey/client/main';

// client page
const WelcomePage = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/client/pages/Welcome')));

// ==============================|| CLIENT ROUTING ||============================== //

const ClientRoutes = {
    path: '/',
    element: <MainClient />,
    children: [
        { index: true, element: <WelcomePage /> },
        { path: 'welcome', element: <WelcomePage /> }
    ]
};

export default ClientRoutes;
