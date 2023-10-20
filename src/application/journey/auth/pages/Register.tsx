// import libs
import { Link } from 'react-router-dom';

// import metarial ui
import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

// import projects
import AuthCardWrapper from '@ecommerce-frontend/src/application/journey/auth/components/AuthCardWrapper';
import AuthRegisterContent from '@ecommerce-frontend/src/application/journey/auth/components/AuthRegister';

// ================================|| AUTH - REGISTER ||================================ //

const RegisterAuth = () => {
    /** get theme init */
    const theme = useTheme();

    /** get size screen */
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthCardWrapper>
            <Grid container spacing={2} alignItems='center' justifyContent='center'>
                {/* <Grid item sx={{ mb: 0 }}>
                    <Link to='#' aria-label='logo'></Link>
                </Grid> */}

                <Grid item xs={12}>
                    <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Grid item>
                            <Stack alignItems='center' justifyContent='center' spacing={1}>
                                <Typography
                                    color={theme.palette.secondary[800]}
                                    gutterBottom
                                    variant={matchDownSM ? 'h3' : 'h2'}
                                >
                                    Hello, Register Account
                                </Typography>
                                <Typography variant='caption' textAlign={matchDownSM ? 'center' : 'inherit'}>
                                    Enter your credentials to continue
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <AuthRegisterContent />
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid item container direction='column' alignItems='center' xs={12}>
                        <Typography component={Link} to={'/login'} variant='subtitle1' sx={{ textDecoration: 'none' }}>
                            Already have an account?
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </AuthCardWrapper>
    );
};

export default RegisterAuth;
