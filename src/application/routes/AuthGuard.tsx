import { useNavigate } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';

// project imports
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import Loader from '@ecommerce-frontend/src/common/functions/Loader';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */

export type GuardProps = {
    children: ReactElement | null;
};

const AuthGuard = ({ children }: GuardProps) => {
    // const { isLoggedIn } = useAuth();
    const { account, isLoggedIn } = useSelector((state) => state.account);

    const navigate = useNavigate();

    useEffect(() => {
        if (account?.role !== 'admin') {
            navigate('/', { replace: true });
        }
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    if (account?.role !== 'admin') {
        return <Loader />;
    }

    return children;
};

export default AuthGuard;
