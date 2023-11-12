// import libs
import React from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

// import projects
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { setDiscount } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';

// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSumary = () => {
    /** init hooks variables */
    const { products, totalQuantity, discounts } = useSelector((state) => state.cart.checkout);

    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [coupon, setCoupon] = React.useState<number>(0);

    React.useEffect(() => {
        dispatch(setDiscount(discounts));
    }, []);

    React.useEffect(() => {
        let total: number = 0;
        let coupon: number = 0;
        let discount = discounts.length ? discounts[0]?.value : 0;
        products.map((item: ProductModel) => {
            total = total + (item.price - item.price * ((item.discount + discount) / 100)) * item.qty;
            coupon = coupon + item.price * (discount / 100) * item.qty;
        });
        setTotalPrice(total);
        setCoupon(coupon);
    }, [discounts, products]);

    return (
        <>
            <SubCard>
                <TableContainer>
                    <Table sx={{ minWidth: 'auto' }} size='small' aria-label='simple table'>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='subtitle1'>Order Summary</Typography>
                                </TableCell>
                                <TableCell />
                            </TableRow>
                            <TableRow>
                                <TableCell>Sub Total</TableCell>
                                <TableCell align='right'>
                                    <Typography variant='subtitle1'>{totalPrice}$</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Coupon Discount</TableCell>
                                <TableCell align='right'>
                                    <Typography variant='subtitle1'>{coupon}$</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shipping Charges</TableCell>
                                <TableCell align='right'>
                                    <Typography variant='subtitle1'>{0}$</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: 'none' }}>
                                    <Typography variant='subtitle1'>Total</Typography>
                                </TableCell>
                                <TableCell align='right' sx={{ borderBottom: 'none' }}>
                                    <Typography variant='subtitle1'>{totalPrice}$</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubCard>
        </>
    );
};

export default OrderSumary;
