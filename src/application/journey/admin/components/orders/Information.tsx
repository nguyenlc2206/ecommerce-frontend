// import libs
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

// import projects
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const sxDivider = {
    borderColor: 'primary.light'
};

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

// ==============================|| ORDER INFOMATION DETAIL ||============================== //

interface OrderDetailProps {
    order: OrderModel;
}

const OrderInformationDetail = ({ order }: OrderDetailProps) => {
    // init theme
    const theme = useTheme();

    // handle processing price
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [coupon, setCoupon] = React.useState<number>(0);
    React.useEffect(() => {
        let total: number = 0;
        let coupon: number = 0;
        let discount = order?.discounts ? order?.discounts[0]?.value : 0;
        order?.orderItems &&
            order?.orderItems.map((item: ProductModel) => {
                total = total + (item.price - item.price * (item.discount / 100)) * item.qty;
                coupon = coupon + item.price * (discount / 100) * item.qty;
            });
        setTotalPrice(total);
        setCoupon(coupon);
    }, [order]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title='Customer'>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Typography variant='body2'>
                                        <CalendarTodayTwoToneIcon sx={detailsIconSX} /> {order?.account?.fullName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body2'>
                                        <PhoneAndroidTwoToneIcon sx={detailsIconSX} /> {order?.account?.phoneNo}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body2'>
                                        <EmailTwoToneIcon sx={detailsIconSX} /> {order?.account?.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant='h4'>Payment method</Typography>
                                        <Stack spacing={0}>
                                            <Typography variant='h6' sx={{ mb: 1 }}>
                                                {order?.paymentCharged?.method === 'card' && 'Credit/Debit Card'}
                                                {order?.paymentCharged?.method === 'cod' && 'Cash on Delivery'}
                                                {order?.paymentCharged?.method === 'paypal' && 'Pay with PayPal'}
                                            </Typography>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Transaction ID :</Typography>
                                                <Typography variant='body2'>000001-TXT</Typography>
                                            </Stack>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Amount :</Typography>
                                                <Typography variant='body2'>${order?.totalPrice}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant='h4'>Shipping method</Typography>
                                        <Stack spacing={0}>
                                            <Typography variant='h6' sx={{ mb: 1 }}>
                                                Giao hàng tiết kiệm
                                            </Typography>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Tracking Code :</Typography>
                                                <Typography variant='body2'>FX-012345-6</Typography>
                                            </Stack>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Date :</Typography>
                                                <Typography variant='body2'>22.06.1999</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant='h4'>Shipping address</Typography>
                                        <Stack>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Customer Name :</Typography>
                                                <Typography variant='body2'>{order?.shippingAddress?.name}</Typography>
                                            </Stack>
                                            <Stack direction='row' spacing={1}>
                                                <Typography variant='subtitle1'>Address :</Typography>
                                                <Typography variant='body2'>
                                                    {order?.shippingAddress?.address}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                                        <Stack direction='row' spacing={1}></Stack>
                                        <Stack direction='row' spacing={1}>
                                            <Typography variant='subtitle1'>Payment status :</Typography>
                                            {order?.paymentStatus === 'paid' && (
                                                <Chip
                                                    label='Paid'
                                                    variant='outlined'
                                                    size='small'
                                                    chipcolor='success'
                                                />
                                            )}
                                            {order?.paymentStatus === 'Not paid' && (
                                                <Chip
                                                    label='Not Paid'
                                                    variant='outlined'
                                                    size='small'
                                                    chipcolor='primary'
                                                />
                                            )}
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={sxDivider} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title='Products' content={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ pl: 3 }}>Name</TableCell>
                                            <TableCell align='right'>Quantity</TableCell>
                                            <TableCell align='right'>Amount</TableCell>
                                            <TableCell align='right' sx={{ pr: 4 }}>
                                                Total
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order?.orderItems &&
                                            order?.orderItems.length &&
                                            order?.orderItems.map((item: ProductModel, index: number) => {
                                                return (
                                                    <TableRow key={order?.id}>
                                                        <TableCell>
                                                            <Grid container spacing={2}>
                                                                <Grid item>
                                                                    <Avatar
                                                                        alt='Product Image'
                                                                        src={item?.image}
                                                                        sx={{ width: 60, height: 60 }}
                                                                    />
                                                                </Grid>
                                                                <Grid item sm zeroMinWidth>
                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12}>
                                                                            <Typography
                                                                                align='left'
                                                                                variant='subtitle1'
                                                                            >
                                                                                {item?.name}{' '}
                                                                                {!item?.isDeleted && (
                                                                                    <CheckCircleIcon
                                                                                        sx={{
                                                                                            color: 'success.dark',
                                                                                            width: 14,
                                                                                            height: 14
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Typography
                                                                                align='left'
                                                                                variant='body2'
                                                                                sx={{ whiteSpace: 'break-spaces' }}
                                                                            >
                                                                                {`Size: ${item?.size}`},{' '}
                                                                                {`Color: ${item?.color}`}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell align='right'>{item?.qty}</TableCell>
                                                        <TableCell align='right'>
                                                            {item?.price * (1 - item?.discount / 100)}
                                                        </TableCell>
                                                        <TableCell align='right' sx={{ pr: 4 }}>
                                                            {item?.price * (1 - item?.discount / 100) * item?.qty}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard
                                sx={{
                                    mx: 3,
                                    mb: 3,
                                    bgcolor: theme.palette.primary.light
                                }}
                            >
                                <Grid container justifyContent='flex-end' spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align='right' variant='subtitle1'>
                                                            Sub Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align='right' variant='body2'>
                                                            ${totalPrice}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Typography align='right' variant='subtitle1'>
                                                            {`Discount (${
                                                                (order?.discounts && order?.discounts[0]?.value) || 0
                                                            }%) :`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align='right' variant='body2'>
                                                            ${coupon || 0}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider sx={{ bgcolor: 'dark.main' }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align='right' color='primary' variant='subtitle1'>
                                                            Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align='right' color='primary' variant='subtitle1'>
                                                            ${order?.totalPrice}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default OrderInformationDetail;
