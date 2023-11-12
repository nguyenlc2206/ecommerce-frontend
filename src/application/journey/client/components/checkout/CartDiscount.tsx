import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, InputBase, FormHelperText, Paper, Stack, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GetCouponByCodeServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/getByCode';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

// project imports

const validationSchema = yup.object({
    code: yup.string().required('Coupon code is required')
});

// ==============================|| CHECKOUT CART - CART DISCOUNT ||============================== //

const CartDiscount = () => {
    // init redux
    const { discounts } = useSelector((state) => state.cart.checkout);
    // * init theme
    const theme = useTheme();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: discounts && discounts[0] ? discounts[0]?.code : ''
        },
        validationSchema,
        onSubmit: async (values) => {
            /** init service */
            const service = new GetCouponByCodeServiceImpl();
            const res = await service.execute(values.code);
        }
    });

    return (
        <Stack justifyContent='flex-end'>
            <Typography align='right' variant='caption' color='error' sx={{ cursor: 'pointer' }} onClick={() => {}}>
                Have a coupon code?
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Paper
                    component='div'
                    sx={{
                        px: 0.25,
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 30 : 'grey.400'
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, fontWeight: 500 }}
                        fullWidth
                        placeholder='Discount Coupon'
                        inputProps={{ 'aria-label': 'search google maps' }}
                        id='code'
                        name='code'
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.code)}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
                    <Button type='submit' color='primary' aria-label='directions'>
                        Apply
                    </Button>
                </Paper>
                {/* {formik.errors.code && (
                    <FormHelperText error id='standard-code'>
                        {formik.errors.code}
                    </FormHelperText>
                )} */}
            </form>
        </Stack>
    );
};

export default CartDiscount;
