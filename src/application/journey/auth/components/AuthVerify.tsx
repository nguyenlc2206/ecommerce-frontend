// import libs
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// import material ui
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiOTPInput from '@ecommerce-frontend/src/application/widgets/otp';

import { Visibility, VisibilityOff } from '@mui/icons-material';

// project imports
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';
import useScriptRef from '@ecommerce-frontend/src/common/hooks/useScriptRef';
import { StringColorProps } from '@ecommerce-frontend/src/common/types';
import { strengthColor, strengthIndicator } from '@ecommerce-frontend/src/common/functions/passwordStrength';

type Item = {
    name: string;
    id: string;
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = Yup.object({
    password: Yup.string().max(255).required('Password is required'),
    passwordConfirm: Yup.string()
        .max(255)
        .oneOf([Yup.ref('password'), null], `Password don't match`)
        .required('Password confirm is required')
});

// ===============================|| AUTH LOGIN ||=============================== //

const AuthVerifyOTPContent = ({ loginProp, ...others }: { loginProp?: number }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { verifyOTP } = useAuth();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordCofirm, setShowPasswordCofirm] = React.useState(false);

    const [otp, setOtp] = React.useState('');

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

    /** define items input of login */
    const verifyOTPInputItems: Array<Item> = [
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        },
        {
            name: 'Password Confirm',
            id: 'passwordConfirm',
            show: showPasswordCofirm,
            setShow: setShowPasswordCofirm
        }
    ];

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    /** init change password for check */
    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    /** init formik */
    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
            submit: null
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await verifyOTP(otp, values.password, values.passwordConfirm);
            if (response.isFailure() && scriptedRef.current) {
                formik.setStatus({ success: false });
                formik.setErrors({ submit: response.error.message });
                formik.setSubmitting(false);
                return;
            }

            if (scriptedRef.current) {
                formik.setStatus({ success: true });
                formik.setSubmitting(false);
                navigate('/login');
            }
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} {...others}>
            <Grid container spacing={2}>
                <Grid item>
                    <MuiOTPInput
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        length={6}
                        validateChar={(val: any) => !isNaN(val)}
                    />
                </Grid>

                <Grid item xs={12}>
                    {verifyOTPInputItems.map((item: Item) => {
                        return (
                            <div key={item.id}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(formik.touched[`${item.id}`] && formik.errors[`${item.id}`])}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor={`outlined-adornment-${item.id}-otp`}>{item.name}</InputLabel>
                                    <OutlinedInput
                                        id={`outlined-adornment-${item.id}-otp`}
                                        type={item.show ? 'text' : 'password'}
                                        value={formik.values[`${item.id}`]}
                                        name={item.id}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            if (item.id === 'password') changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            item.setShow && (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => item.setShow(!item?.show)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge='end'
                                                        size='large'
                                                    >
                                                        {item.show ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                        inputProps={{}}
                                    />
                                    {formik.touched[`${item.id}`] && formik.errors[`${item.id}`] && (
                                        <FormHelperText error id={`standard-weight-helper-text-${item.id}-login`}>
                                            {formik.errors[`${item.id}`]}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {item.id === 'password' && strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems='center'>
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle1' fontSize='0.75rem'>
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
                            </div>
                        );
                    })}

                    {formik.errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{`${formik.errors.submit}`}</FormHelperText>
                        </Box>
                    )}

                    {otp.length === 6 && (
                        <Box sx={{ mt: 2 }}>
                            <LoadingButton
                                fullWidth
                                onClick={() => {}}
                                loading={formik.isSubmitting}
                                variant='contained'
                                size='large'
                                color='secondary'
                                type='submit'
                            >
                                <span>Verify OTP</span>
                            </LoadingButton>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default AuthVerifyOTPContent;
