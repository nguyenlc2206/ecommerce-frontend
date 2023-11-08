// import libs
import React from 'react';
import { useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

// import material ui
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';
import useScriptRef from '@ecommerce-frontend/src/common/hooks/useScriptRef';

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
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
});

// ===============================|| AUTH LOGIN ||=============================== //

const AuthLoginContent = ({ loginProp, ...others }: { loginProp?: number }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);

    /** define items input of login */
    const loginInputItems: Array<Item> = [
        {
            name: 'Email Address / Username',
            id: 'email',
            show: true
        },
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        }
    ];

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    const formik = useFormik({
        initialValues: {
            email: 'admin@gmail.com',
            password: 'admin123',
            submit: null
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await login(values.email, values.password);
            if (response.isFailure() && scriptedRef.current) {
                formik.setStatus({ success: false });
                formik.setErrors({ submit: response.error.message });
                formik.setSubmitting(false);
                return;
            }

            if (scriptedRef.current) {
                formik.setStatus({ success: true });
                formik.setSubmitting(false);
                navigate('/');
            }
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} {...others}>
            {loginInputItems.map((item: Item) => {
                return (
                    <FormControl
                        key={item.id}
                        fullWidth
                        error={Boolean(formik.touched[`${item.id}`] && formik.errors[`${item.id}`])}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor={`outlined-adornment-${item.id}-login`}>{item.name}</InputLabel>
                        <OutlinedInput
                            id={`outlined-adornment-${item.id}-login`}
                            type={item.show ? 'text' : 'password'}
                            value={formik.values[`${item.id}`]}
                            name={item.id}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
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
                );
            })}

            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name='checked'
                                color='primary'
                            />
                        }
                        label='Keep me logged in'
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant='subtitle1'
                        component={Link}
                        to={'/forgot-password'}
                        color='secondary'
                        sx={{ textDecoration: 'none' }}
                    >
                        Forgot Password?
                    </Typography>
                </Grid>
            </Grid>

            {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{`${formik.errors.submit}`}</FormHelperText>
                </Box>
            )}

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
                    <span>Sign In</span>
                </LoadingButton>
            </Box>
        </form>
    );
};

export default AuthLoginContent;
