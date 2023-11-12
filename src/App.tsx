// import libs
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import projects
import Loader from '@ecommerce-frontend/src/common/functions/Loader';
import InjectionInit from '@ecommerce-frontend/src/injection';

import ThemeCustomization from '@ecommerce-frontend/src/application/themes';
import Locales from '@ecommerce-frontend/src/common/functions/Locales';
import NavigationScroll from '@ecommerce-frontend/src/common/functions/NavigationScroll';
import ThemeRoutes from '@ecommerce-frontend/src/application/routes';
import Notistack from '@ecommerce-frontend/src/application/widgets/notification/Notistack';
import Snackbar from '@ecommerce-frontend/src/application/widgets/notification/Snackbar';

import { JWTProvider as AuthProvider, setSession } from '@ecommerce-frontend/src/common/contexts/JWT';
import { CheckAccountMeServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/checkAccountMe';
import PageLoading from '@ecommerce-frontend/src/common/functions/Loading';

// * import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { LOGIN, LOGOUT } from '@ecommerce-frontend/src/infras/data/store/actions/account';

// ==============================|| APP CONFIG ||============================== //

const App: FC = () => {
    /** init redux */
    const { pageLoading } = useSelector((state) => state.page);
    /** init hooks */
    const [loading, setLoading] = React.useState<boolean>(true);

    const pathName = useLocation();
    const navigate = useNavigate();

    /** initial function */
    const handleInitialApp = async () => {
        const serviceToken = window.localStorage.getItem('serviceToken');

        if (serviceToken && pathName?.pathname !== '/login') {
            setSession(serviceToken);
            const checkAccountMeService = new CheckAccountMeServiceImpl();
            const result = await checkAccountMeService.execute();

            if (result.isFailure()) {
                dispatch({
                    type: LOGOUT
                });
                setLoading(false);
                return;
            }
            // * dispatch redux
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    account: result.data
                }
            });
        } else {
            dispatch({
                type: LOGOUT
            });
            navigate('/login');
        }
        setLoading(false);
    };

    /** init useEffect */
    React.useEffect(() => {
        InjectionInit();
        handleInitialApp();
    }, [pageLoading]);

    if (loading) return <Loader />;

    return (
        <ThemeCustomization>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Notistack>
                                <ThemeRoutes />
                                <Snackbar />
                                <PageLoading />
                            </Notistack>
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </ThemeCustomization>
    );
};

export default App;
