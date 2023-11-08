// import libs
import { Link } from 'react-router-dom';

// import metarial ui
import { Button, Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

// import projects
import AuthCardWrapper from '@ecommerce-frontend/src/application/journey/auth/components/AuthCardWrapper';
import AuthVerifyOTPContent from '@ecommerce-frontend/src/application/journey/auth/components/AuthVerify';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// ================================|| AUTH VERIFY OTP - LOGIN ||================================ //

const VerifyOTPAuth = () => {
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
                                    color={theme.palette.secondary.main}
                                    gutterBottom
                                    variant={matchDownSM ? 'h3' : 'h2'}
                                >
                                    Enter Verification Code
                                </Typography>
                                <Typography variant='subtitle1' fontSize='1rem'>
                                    We send you on mail.
                                </Typography>
                                <Typography
                                    variant='caption'
                                    fontSize='0.875rem'
                                    textAlign={matchDownSM ? 'center' : 'inherit'}
                                >
                                    We’ve send you code on jone.****@gmail.com
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <AuthVerifyOTPContent />
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid item container direction='column' alignItems='center' xs={12}>
                        <Typography
                            component={Link}
                            to='#'
                            variant='subtitle1'
                            sx={{ textDecoration: 'none' }}
                            textAlign={matchDownSM ? 'center' : 'inherit'}
                        >
                            Did not receive the email? Check your spam filter, or
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size='large'
                            type='submit'
                            variant='outlined'
                            color='secondary'
                        >
                            Resend Code
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </AuthCardWrapper>
    );
};

export default VerifyOTPAuth;
