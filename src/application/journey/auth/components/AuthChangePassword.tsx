// import libs
import React from 'react';
import { useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// import material ui
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
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
    passwordCurrent: Yup.string().max(255).required('passwordCurrent is required'),
    password: Yup.string().max(255).required('Password is required'),
    passwordConfirm: Yup.string()
        .max(255)
        .oneOf([Yup.ref('password'), null], `Password don't match`)
        .required('Password confirm is required')
});

// ===============================|| AUTH LOGIN ||=============================== //

const AuthChangePasswordContent = ({ changePasswordProp, ...others }: { changePasswordProp?: number }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { changePassword } = useAuth();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = React.useState(true);
    const [showPasswordCurrent, setShowPasswordCurrent] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    /** define items input of login */
    const changePasswordInputItems: Array<Item> = [
        {
            name: 'Current Password',
            id: 'passwordCurrent',
            show: showPasswordCurrent,
            setShow: setShowPasswordCurrent
        },
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        },
        {
            name: 'Password Confirm',
            id: 'passwordConfirm',
            show: showPasswordConfirm,
            setShow: setShowPasswordConfirm
        }
    ];

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    const formik = useFormik({
        initialValues: {
            passwordCurrent: '',
            password: '',
            passwordConfirm: '',
            submit: null
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await changePassword(values.passwordCurrent, values.password, values.passwordConfirm);
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
            {changePasswordInputItems.map((item: Item) => {
                return (
                    <FormControl
                        key={item.id}
                        fullWidth
                        error={Boolean(formik.touched[`${item.id}`] && formik.errors[`${item.id}`])}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor={`outlined-adornment-${item.id}-changepaswword`}>{item.name}</InputLabel>
                        <OutlinedInput
                            id={`outlined-adornment-${item.id}-changepaswword`}
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
                                            {item?.show ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                            inputProps={{}}
                        />
                        {formik.touched[`${item.id}`] && formik.errors[`${item.id}`] && (
                            <FormHelperText error id={`standard-weight-helper-text-${item.id}-changepaswword`}>
                                {formik.errors[`${item.id}`]}
                            </FormHelperText>
                        )}
                    </FormControl>
                );
            })}

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
                    <span>Save Change</span>
                </LoadingButton>
            </Box>
        </form>
    );
};

export default AuthChangePasswordContent;
