// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery } from '@mui/material';

// * import icons
import { IconMenu2 } from '@tabler/icons-react';

// * import redux
import { useDispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { openDrawer } from '@ecommerce-frontend/src/infras/data/store/reducers/menu';
import ProfileSection from '@ecommerce-frontend/src/application/journey/layouts/admin/Header/components/ProflieSection';
import LocalizationSection from '@ecommerce-frontend/src/application/journey/layouts/admin/Header/components/LocalizationSection';

// ==============================|| MAIN NAVBAR / HEADER ADMIN ||============================== //

const HeaderAdmin = () => {
    /** init theme */
    const theme = useTheme();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Avatar
                    variant='rounded'
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background:
                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color:
                            theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.secondary.main
                                    : theme.palette.secondary.dark,
                            color:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.secondary.light
                                    : theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color='inherit'
                >
                    <IconMenu2 stroke={1.5} size='20px' />
                </Avatar>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, px: 1 }}>
                <LocalizationSection />
            </Box>

            <Box sx={{ px: 1 }}>
                <ProfileSection />
            </Box>
        </>
    );
};

export default HeaderAdmin;
