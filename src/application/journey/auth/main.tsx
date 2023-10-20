// import libs
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

// import projects
import AuthWrapper from '@ecommerce-frontend/src/application/journey/auth/components/AuthWrapper';

// ==============================|| MAIN AUTH LAYOUT ||============================== //

const Authentication = () => {
    return (
        <AuthWrapper>
            <Grid container direction='column' justifyContent='flex-end' sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent='center'
                        alignItems='center'
                        sx={{ minHeight: 'calc(100vh - 60px)' }}
                    >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <Outlet />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Authentication;
