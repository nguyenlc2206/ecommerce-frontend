// import libs
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, Divider, Grid, Stack, Typography, Zoom, ZoomProps, useMediaQuery } from '@mui/material';

// project imports
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import completed from '@ecommerce-frontend/src/assets/images/e-commerce/completed.png';
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { setOrderComplete } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';

const Transition = forwardRef((props: ZoomProps, ref) => <Zoom ref={ref} {...props} />);

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open }: { open: boolean }) => {
    // init theme
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    // init redux
    const { orderComplete } = useSelector((state) => state.cart.checkout);
    const { account } = useSelector((state) => state.account);

    const naviage = useNavigate();

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
            maxWidth='md'
            sx={{
                '& .MuiDialog-paper': {
                    p: 0
                }
            }}
        >
            {open && (
                <MainCard>
                    <PerfectScrollbar
                        style={{
                            overflowX: 'hidden',
                            height: 'calc(100vh - 100px)'
                        }}
                    >
                        <Grid
                            container
                            direction='column'
                            spacing={gridSpacing}
                            alignItems='center'
                            justifyContent='center'
                            sx={{ my: 3 }}
                        >
                            <Grid item xs={12}>
                                <Typography variant={matchDownMD ? 'h2' : 'h1'}>Thank you for order!</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack alignItems='center' spacing={2}>
                                    <Typography align='center' variant='h4' sx={{ fontWeight: 400, color: 'grey.500' }}>
                                        We will send a process notification, before it delivered.
                                    </Typography>
                                    <Typography variant='body1' align='center'>
                                        Your order id:{' '}
                                        <Typography variant='subtitle1' component='span' color='primary'>
                                            {orderComplete?.orderNumber}
                                        </Typography>
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sx={{ m: 3 }}>
                                <img src={completed} alt='Order Complete' width='100%' style={{ maxWidth: 780 }} />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Stack alignItems='center' spacing={1}>
                                    <Typography variant='caption' align='center'>
                                        If you have any query or questions regarding purchase items, then fell to get in
                                        contact us
                                    </Typography>
                                    <Typography variant='subtitle1' color='error' sx={{ cursor: 'pointer' }}>
                                        {account?.phoneNo}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    direction={matchDownMD ? 'column-reverse' : 'row'}
                                    container
                                    spacing={3}
                                    alignItems={matchDownMD ? '' : 'center'}
                                    justifyContent='space-between'
                                >
                                    <Grid item>
                                        <Button
                                            variant='text'
                                            startIcon={<KeyboardBackspaceIcon />}
                                            onClick={() => {
                                                naviage('/products');
                                                dispatch(setOrderComplete({ status: false, id: '', orderNumber: '' }));
                                            }}
                                        >
                                            Continue Shopping
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            onClick={() => {
                                                naviage(`/orders/${orderComplete?.id}`);
                                                dispatch(setOrderComplete({ status: false }));
                                            }}
                                        >
                                            Download Invoice
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                </MainCard>
            )}
        </Dialog>
    );
};

export default OrderComplete;
