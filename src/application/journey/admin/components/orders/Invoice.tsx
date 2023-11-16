import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// import projects
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import Chip from '@ecommerce-frontend/src/application/widgets/Chip';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// ==============================|| ORDER INVOICE DETAIL ||============================== //

interface OrderDetailProps {
    order: OrderModel;
}

const OrderInvoiceDetail = ({ order }: OrderDetailProps) => {
    const theme = useTheme();
    const componentRef: React.Ref<HTMLDivElement> = useRef(null);

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
        <Grid container justifyContent='center' spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard darkTitle title={`Invoice #${order?.orderNumber}`}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>Ecommerce Shop Project</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body2'>Thu Duc, Tp.Ho Chi Minh</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography component={Link} to='#' variant='body2' color='primary'>
                                        nguyenlc.smile@gmail.com
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body2'>(+84) 369 9360 057 </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={5}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='h5'>Customer :</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant='subtitle1'>
                                                        {order?.shippingAddress?.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant='body2'>
                                                        {order?.shippingAddress?.address}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant='body2'>{order?.account?.phoneNo}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography component={Link} to='#' variant='body2' color='primary'>
                                                        {order?.account?.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='h5'>Order Details :</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={4}>
                                                    <Typography variant='body2'>Date :</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant='body2'>November 14</Typography>
                                                </Grid>
                                                <Grid item xs={4} sx={{ my: 0.5 }}>
                                                    <Typography variant='body2'>Status :</Typography>
                                                </Grid>
                                                <Grid item xs={8} sx={{ my: 0.5 }}>
                                                    {order?.status === 'pending' && (
                                                        <Chip label='Pending' size='small' chipcolor='primary' />
                                                    )}
                                                    {order?.status === 'processing' && (
                                                        <Chip label='Processing' size='small' chipcolor='warning' />
                                                    )}
                                                    {order?.status === 'shipped' && (
                                                        <Chip label='Shipped' size='small' chipcolor='warning' />
                                                    )}
                                                    {order?.status === 'delivered' && (
                                                        <Chip label='Complete' size='small' chipcolor='success' />
                                                    )}
                                                    {order?.status === 'cancel' && (
                                                        <Chip label='Cancel' size='small' chipcolor='error' />
                                                    )}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant='body2'>Order Id :</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant='body2' component={Link} to='#'>
                                                        {order?.orderNumber}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                                                                            sx={{
                                                                                                whiteSpace:
                                                                                                    'break-spaces'
                                                                                            }}
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
                                                                        {item?.price *
                                                                            (1 - item?.discount / 100) *
                                                                            item?.qty}
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
                                                <Grid item sm={8} md={6}>
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
                                                                            (order?.discounts &&
                                                                                order?.discounts[0]?.value) ||
                                                                            0
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
                                                                    <Typography
                                                                        align='right'
                                                                        color='primary'
                                                                        variant='subtitle1'
                                                                    >
                                                                        Total :
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography
                                                                        align='right'
                                                                        color='primary'
                                                                        variant='subtitle1'
                                                                    >
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
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>Terms and Condition :</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body2'>
                                        lorem ipsum dolor sit connecter adieu siccing eliot, sed do elusion tempore
                                        incident ut laborer et dolors magna aliquot.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
                <Grid
                    container
                    spacing={1}
                    justifyContent='center'
                    sx={{
                        maxWidth: 850,
                        mx: 'auto',
                        mt: 0,
                        mb: 2.5,
                        '& > .MuiCardContent-root': {
                            py: { xs: 3.75, md: 5.5 },
                            px: { xs: 2.5, md: 5 }
                        }
                    }}
                >
                    <Grid item>
                        <AnimateButton>
                            <ReactToPrint
                                trigger={() => <Button variant='contained'>Print</Button>}
                                content={() => componentRef.current}
                            />
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrderInvoiceDetail;
