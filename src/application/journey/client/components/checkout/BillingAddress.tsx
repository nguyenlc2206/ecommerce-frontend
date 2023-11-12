// import libs
import React, { useState, ReactElement } from 'react';

// material-ui
import { Button, Divider, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';

// import projects
import { Address } from '@ecommerce-frontend/src/common/types/e-commerce';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import OrderSummary from '@ecommerce-frontend/src/application/journey/client/components/checkout/OrderSummary';

// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';
import { setBillingAddress } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

// ==============================|| CHECKOUT BILLING ADDRESS - MAIN ||============================== //

interface BillingAddressProps {
    onBack: () => void;
    billingAddressHandler: () => void;
}

// yup validation-schema
const validationSchema = yup.object({
    customerName: yup.string().required('Customer Name is Required'),
    customerAddress: yup.string().required('Customer Address is Required')
});

const BillingAddress = ({ onBack, billingAddressHandler }: BillingAddressProps) => {
    // init redux
    const { billingAddress, step } = useSelector((state) => state.cart.checkout);
    React.useEffect(() => {}, [billingAddress, step]);

    const { account } = useSelector((state) => state.account);
    const [status, setStatus] = React.useState<boolean>(
        (billingAddress && billingAddress?.name && billingAddress?.address) || step !== 'billing'
    );

    // init formik
    const formik = useFormik({
        initialValues: {
            customerName: billingAddress && billingAddress?.name ? billingAddress?.name : '',
            customerAddress: billingAddress && billingAddress?.address ? billingAddress?.address : ''
        },
        validationSchema,
        onSubmit: (values) => {
            const address = { name: values?.customerName, address: values?.customerAddress };
            dispatch(setBillingAddress(address));
            setStatus(!status);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Add address success',
                    variant: 'alert',
                    alert: { color: 'success' },
                    close: false
                })
            );
        }
    });

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Billing Address</Typography>
                                    {/* <Button
                                        type='submit'
                                        size='small'
                                        variant='contained'
                                        startIcon={<AddIcon />}
                                        onClick={() => {}}
                                    >
                                        Add Address
                                    </Button> */}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack>
                                    <InputLabel required>Customer Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id='customerName'
                                        name='customerName'
                                        value={formik.values.customerName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                        // helperText={formik.touched.customerName && formik.errors.customerName}
                                        placeholder='Alex Z.'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack>
                                    <InputLabel required>Customer Address</InputLabel>
                                    <TextField
                                        fullWidth
                                        id='customerAddress'
                                        name='customerAddress'
                                        value={formik.values.customerAddress}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.customerAddress && Boolean(formik.errors.customerAddress)}
                                        // helperText={formik.touched.customerAddress && formik.errors.customerAddress}
                                        onChange={formik.handleChange}
                                        multiline
                                        placeholder='Enter Address'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <OrderSummary />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                    <Grid item>
                                        <Button variant='text' startIcon={<KeyboardBackspaceIcon />} onClick={onBack}>
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {!status ? (
                                            <Button variant='contained' onClick={billingAddressHandler}>
                                                Place Order
                                            </Button>
                                        ) : (
                                            <Button type='submit' variant='contained'>
                                                Add Address
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SubCard sx={{ mb: gridSpacing }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction='row' spacing={1.5} alignItems='center'>
                                    <PersonOutlineTwoToneIcon color='primary' />
                                    <Typography variant='h3'>Delia Pope</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0.25}>
                                    <Typography variant='caption'>Email</Typography>
                                    <Typography variant='subtitle1'>{account?.email}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0.25}>
                                    <Typography variant='caption'>Contact</Typography>
                                    <Typography variant='subtitle1'>{account?.phoneNo}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0.25}>
                                    <Typography variant='caption'>No. of order</Typography>
                                    <Typography variant='subtitle1'>19</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default BillingAddress;
