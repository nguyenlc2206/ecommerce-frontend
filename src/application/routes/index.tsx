// import libs
import { useRoutes } from 'react-router-dom';

// impor projects
import AppRoutes from '@ecommerce-frontend/src/application/journey/app/routes';
import ClientRoutes from '@ecommerce-frontend/src/application/journey/client/routes';
import AuthenticationRoutes from '@ecommerce-frontend/src/application/journey/auth/routes';
import AdminRoutes from '@ecommerce-frontend/src/application/journey/admin/routes';

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = () => {
    return useRoutes([AppRoutes, ClientRoutes, AuthenticationRoutes, AdminRoutes]);
};

export default ThemeRoutes;
