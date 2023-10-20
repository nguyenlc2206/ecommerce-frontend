// import libs
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

// third party
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

// project import
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';
import useScriptRef from '@ecommerce-frontend/src/common/hooks/useScriptRef';
import { strengthColor, strengthIndicator } from '@ecommerce-frontend/src/common/functions/passwordStrength';

// type
import { StringColorProps } from '@ecommerce-frontend/src/common/types';

// import redux
import { useDispatch } from '@ecommerce-frontend/src/infras/data/store';

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
    phoneNumber: Yup.string().max(255).required('Phone number is required'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
    passwordConfirm: Yup.string()
        .max(255)
        .oneOf([Yup.ref('password'), null], `Password don't match`)
        .required('Password confirm is required')
});

// ===============================|| AUTH REGISTER ||=============================== //

const AuthRegisterContent = ({ ...others }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { register } = useAuth();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

    /** define items input of register */
    const registerInputItems: Array<Item> = [
        {
            name: 'Email',
            id: 'email',
            show: true
        },
        {
            name: 'Phone number',
            id: 'phoneNumber',
            show: true
        },
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        },
        {
            name: 'Password confirm',
            id: 'passwordConfirm',
            show: showPasswordConfirm,
            setShow: setShowPasswordConfirm
        }
    ];

    /** init change password for check */
    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            password: '',
            passwordConfirm: '',
            submit: null
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await register(
                values.fullName,
                values.email,
                values.phoneNumber,
                values.password,
                values.passwordConfirm
            );
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
            {registerInputItems.map((item: Item) => {
                return (
                    <div key={item.id}>
                        <FormControl
                            fullWidth
                            error={Boolean(formik.touched[`${item.id}`] && formik.errors[`${item.id}`])}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor={`outlined-adornment-${item.id}-register`}>{item.name}</InputLabel>

                            <OutlinedInput
                                id={`outlined-adornment-${item.id}-register`}
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
                                                // onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                                size='medium'
                                            >
                                                {item?.show ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            />
                            {formik.touched[`${item.id}`] && formik.errors[`${item.id}`] && (
                                <FormHelperText error id={`standard-weight-helper-text-${item.id}-register`}>
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
                        label={
                            <Typography variant='subtitle1'>
                                Agree with &nbsp;
                                <Typography variant='subtitle1' component={Link} to='#'>
                                    Terms & Condition.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>

            {formik.errors.submit && (
                <Box sx={{ mt: 1 }}>
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
                    <span>Sign Up</span>
                </LoadingButton>
            </Box>
        </form>
    );
};

export default AuthRegisterContent;
