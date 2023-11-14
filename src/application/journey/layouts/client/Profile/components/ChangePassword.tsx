// import libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Alert, AlertTitle, Button, Grid, TextField } from '@mui/material';

// import projects
import SubCard from '@ecommerce-frontend/src/application/widgets/cards/SubCard';
import { gridSpacing } from '@ecommerce-frontend/src/infras/data/store/constant';
import AnimateButton from '@ecommerce-frontend/src/application/widgets/buttons/AnimateButton';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';

// ==============================|| PROFILE - CHANGE PASSWORD ||============================== //

const ChangePasswordProfile = () => {
    /** init theme */
    const navigate = useNavigate();
    const theme = useTheme();
    const { changePassword, changePasswordAdmin } = useAuth();
    const { userSelect } = useSelector((state) => state.user);

    /** init hooks */
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');

    /** clear fields */
    const handleClearFields = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    /** validation fields */
    const validationFields = () => {
        if (!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Somthing wrong from fields!',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            setIsSubmitting(false);
            return;
        }
    };

    /** handle change password */
    const handleChangePassword = async () => {
        setIsSubmitting(true);
        // valition
        validationFields();

        // execute service
        if (!userSelect) {
            const res = await changePassword(currentPassword, newPassword, confirmPassword);
            if (res.isFailure()) return;
            navigate('/login');
        } else {
            const res = await changePasswordAdmin(userSelect?.id, currentPassword, newPassword, confirmPassword);
            if (res.isFailure()) return;
        }
        handleClearFields();
        setIsSubmitting(false);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Alert severity='warning' variant='outlined' sx={{ borderColor: 'warning.dark' }}>
                        <AlertTitle>Alert!</AlertTitle>
                        Your Password will expire in every 3 months. So change it periodically.
                        <strong> Do not share your password</strong>
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title='Change Password'>
                        <form noValidate autoComplete='off'>
                            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type='password'
                                        id='outlined-basic7'
                                        fullWidth
                                        label='Current Password'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type='password'
                                        id='outlined-basic8'
                                        fullWidth
                                        label='New Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type='password'
                                        id='outlined-basic9'
                                        fullWidth
                                        label='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Grid spacing={2} container justifyContent='flex-end' sx={{ mt: 3 }}>
                            <Grid item>
                                <AnimateButton>
                                    <Button disabled={isSubmitting} variant='contained' onClick={handleChangePassword}>
                                        Change Password
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <Button sx={{ color: theme.palette.error.main }} onClick={handleClearFields}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default ChangePasswordProfile;
