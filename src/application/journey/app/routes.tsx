// import libs
import { lazy } from 'react';

// import projects
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';

const CheckoutPaymentSucess = Loadable(
    lazy(() => import('@ecommerce-frontend/src/application/journey/client/components/checkout/sucess'))
);

// ==============================|| APP ROUTING ||============================== //
const AppRoutes = {
    path: '/',
    element: '',
    children: [{ path: 'checkout/success', element: <CheckoutPaymentSucess /> }]
};

export default AppRoutes;
