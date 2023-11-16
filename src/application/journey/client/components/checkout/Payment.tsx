// import libs
import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    RadioGroup,
    Radio,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';

// import projects
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import PaymentOptions from '@ecommerce-frontend/src/application/journey/client/components/checkout/PaymentOptions';
import { PaymentOptionsProps } from '@ecommerce-frontend/src/common/types/e-commerce';
import PaymentSelect from '@ecommerce-frontend/src/application/journey/client/components/checkout/PaymentSelect';
import ColorOptions from '@ecommerce-frontend/src/application/journey/client/components/products/filter/ColorOptions';
import Avatar from '@ecommerce-frontend/src/application/widgets/avatar/Avatar';
import OrderSummary from '@ecommerce-frontend/src/application/journey/client/components/checkout/OrderSummary';
import AddressCard from '@ecommerce-frontend/src/application/journey/client/components/checkout/AddressCard';
import OrderComplete from '@ecommerce-frontend/src/application/journey/client/components/checkout/OrderComplete';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { setPayment } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';

// import service
import { CreateOrderServiceImpl } from '@ecommerce-frontend/src/domain/services/order/create';

// product color select
function getColor(color: string) {
    return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
    onBack: () => void;
    onNext: () => void;
}

const PaymentCheckout = ({ onBack, onNext }: PaymentProps) => {
    // init redux
    const { paymentCharged, products, orderComplete, discounts } = useSelector((state) => state.cart.checkout);
    const { checkout } = useSelector((state) => state.cart);

    // handle payment method
    const [paymentMethod, setPaymentMethod] = useState(paymentCharged.method);
    const handlePaymentMethod = (value: string) => {
        dispatch(setPayment({ method: value }));
        setPaymentMethod(value);
    };

    // handle payment shipping charge
    const [shippingCharge, setShippingCharge] = useState(paymentCharged.type);
    const handleShippingCharge = (type: string) => {
        dispatch(setPayment({ type: type }));
        setShippingCharge(type);
    };

    // handle complete order
    const completeOrder = async () => {
        // processing total price
        let total: number = 0;
        let coupon: number = 0;
        let discount = discounts.length ? discounts[0]?.value : 0;
        products.map((item: ProductModel) => {
            total = total + (item.price - item.price * (item.discount / 100)) * item.qty;
            coupon = coupon + item.price * (discount / 100) * item.qty;
        });
        // process data order
        const _oderItems = [];
        checkout.products.map((item: ProductModel) => {
            const itemClone = _.cloneDeep(item);
            const _item = _.omit(itemClone, ['totalQty', 'productId']);
            _oderItems.push({ ..._item, id: itemClone?.productId });
        });
        const data = {
            orderItems: _oderItems,
            shippingAddress: checkout?.billingAddress,
            codes: checkout?.discounts[0]?.code || '',
            paymentCharged: checkout.paymentCharged,
            totalPrice: total - coupon,
            discounts: discounts
        } as OrderModel;
        // init service order
        const service = new CreateOrderServiceImpl();
        const res = await service.execute(data);
        if (res.isFailure()) return;

        onNext();
    };

    React.useEffect(() => {}, [orderComplete]);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6} lg={7} xl={8}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Stack>
                                <Typography variant='subtitle1'>Delivery Options</Typography>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label='delivery-options'
                                        value={shippingCharge}
                                        onChange={(e) => {
                                            handleShippingCharge(e.target.value);
                                        }}
                                        name='delivery-options'
                                    >
                                        <Grid container spacing={gridSpacing} alignItems='center' sx={{ pt: 2 }}>
                                            <Grid item xs={12} sm={6} md={12} lg={6}>
                                                <SubCard content={false}>
                                                    <Box sx={{ p: 2 }}>
                                                        <FormControlLabel
                                                            value='free'
                                                            control={<Radio />}
                                                            label={
                                                                <Stack spacing={0.25}>
                                                                    <Typography variant='subtitle1'>
                                                                        Standard Delivery (Free)
                                                                    </Typography>
                                                                    <Typography variant='caption'>
                                                                        Delivered on Monday 8 Jun
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                                                        />
                                                    </Box>
                                                </SubCard>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={12} lg={6}>
                                                <SubCard content={false}>
                                                    <Box sx={{ p: 2 }}>
                                                        <FormControlLabel
                                                            value='fast'
                                                            control={<Radio />}
                                                            label={
                                                                <Stack spacing={0.25}>
                                                                    <Typography variant='subtitle1'>
                                                                        Fast Delivery ($5.00)
                                                                    </Typography>
                                                                    <Typography variant='caption'>
                                                                        Delivered on Friday 5 Jun
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                                                        />
                                                    </Box>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>Payment Options</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <RadioGroup
                                    aria-label='delivery-options'
                                    value={paymentMethod}
                                    onChange={(e) => handlePaymentMethod(e.target.value)}
                                    name='delivery-options'
                                >
                                    <Grid container spacing={gridSpacing} alignItems='center'>
                                        {PaymentOptions.map((item: PaymentOptionsProps, index) => (
                                            <Grid item xs={12} key={index}>
                                                <PaymentSelect item={item} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                <Grid item>
                                    <Button variant='text' startIcon={<KeyboardBackspaceIcon />} onClick={onBack}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' onClick={completeOrder}>
                                        Complete Order
                                    </Button>
                                    <OrderComplete open={orderComplete?.status || false} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={5} xl={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Stack>
                                <Typography variant='subtitle1' sx={{ pb: 2 }}>
                                    Cart Items
                                </Typography>
                                <TableContainer>
                                    <Table sx={{ minWidth: 280 }} aria-label='simple table'>
                                        <TableBody>
                                            {products.map((item: ProductModel, index: number) => {
                                                const colorsData = item.color ? getColor(item.color) : false;
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                                                    >
                                                        <TableCell component='th' scope='row'>
                                                            <Grid container alignItems='center' spacing={2}>
                                                                <Grid item>
                                                                    <Avatar
                                                                        size='md'
                                                                        variant='rounded'
                                                                        src={item?.image}
                                                                        alt='product images'
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Stack spacing={0}>
                                                                        <Typography variant='subtitle1'>
                                                                            {item.name}
                                                                        </Typography>
                                                                        <Stack
                                                                            direction='row'
                                                                            alignItems='center'
                                                                            spacing={1}
                                                                        >
                                                                            <Typography
                                                                                variant='subtitle2'
                                                                                sx={{ fontWeight: 500 }}
                                                                            >
                                                                                Size:{' '}
                                                                                <Typography
                                                                                    variant='caption'
                                                                                    component='span'
                                                                                >
                                                                                    {item.size}
                                                                                </Typography>
                                                                            </Typography>
                                                                            <Typography
                                                                                variant='caption'
                                                                                sx={{ fontSize: '1rem' }}
                                                                            >
                                                                                |
                                                                            </Typography>
                                                                            <Typography
                                                                                variant='subtitle2'
                                                                                sx={{ fontWeight: 500 }}
                                                                            >
                                                                                Color:{' '}
                                                                                <Typography
                                                                                    variant='caption'
                                                                                    component='span'
                                                                                >
                                                                                    {colorsData
                                                                                        ? colorsData[0].label
                                                                                        : 'Multicolor'}
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            {item.price && item.totalQty && (
                                                                <Typography variant='subtitle1'>
                                                                    {(item.price - item.price * (item.discount / 100)) *
                                                                        item?.qty}
                                                                    $
                                                                </Typography>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <OrderSummary />
                        </Grid>
                        <Grid item xs={12}>
                            <AddressCard single change onBack={onBack} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentCheckout;
