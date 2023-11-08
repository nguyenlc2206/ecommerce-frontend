// import libs
import { Outlet, useLocation } from 'react-router-dom';
import { lazy } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';

// import project
import { Grid } from '@mui/material';
import Loadable from '@ecommerce-frontend/src/common/functions/Loadable';

// custom stlye
const SectionWrapper = styled('div')({
    paddingBottom: 50
});

const PageWrapper = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    overflowY: 'hidden'
}));

// ==============================|| LANDING - MAIN CLIENT LAYOUT ||============================== //

const FooterSection = Loadable(lazy(() => import('@ecommerce-frontend/src/application/journey/layouts/client/Footer')));

const MainClient = () => {
    const pathName = useLocation();

    return (
        <PageWrapper>
            <Grid container justifyContent='space-around' sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Outlet />
                </Grid>

                <Grid item xs={12}>
                    <div style={{ paddingTop: pathName?.pathname === '/' ? 50 : 0 }}>
                        <SectionWrapper sx={{ bgcolor: 'dark.900', pb: 0 }}>
                            <FooterSection pathName={pathName} />
                        </SectionWrapper>
                    </div>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default MainClient;
