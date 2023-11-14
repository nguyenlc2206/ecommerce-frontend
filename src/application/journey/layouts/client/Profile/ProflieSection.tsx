// import libs
import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import MainCard from '@ecommerce-frontend/src/application/widgets/cards/MainCard';
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import Transitions from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/components/Transitions';

import useAuth from '@ecommerce-frontend/src/common/hooks/useAuth';

// import redux
import { dispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { activeUser } from '@ecommerce-frontend/src/infras/data/store/reducers/user';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    /** init theme */
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();

    /** init variables */
    const { account } = useSelector((state) => state.account);
    const { logout } = useAuth();

    /** init hooks */
    const [open, setOpen] = React.useState(false);

    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = React.useRef<any>(null);

    // * handle close
    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    // * handle handleListItemClick
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
        handleClose(event);
        if (route && route !== '') {
            dispatch(activeUser(null));
            navigate(route);
        }
    };

    // * handle logour
    const handlLogout = async () => {
        const res = await logout();
        if (res.isFailure()) return;
        navigate('/login');
    };

    /**  useEffect */
    React.useEffect(() => {}, []);

    return (
        <>
            <Chip
                sx={{
                    height: '42px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor:
                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={account?.avatar as string}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                        alt='user-images'
                    />
                }
                label={<IconSettings stroke={1.5} size='1.5rem' color={theme.palette.primary.main} />}
                variant='outlined'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={() => {
                    setOpen((prevOpen) => !prevOpen);
                }}
                color='primary'
                aria-label='user-account'
            />

            <Popper
                placement='bottom'
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard
                                        border={false}
                                        elevation={16}
                                        content={false}
                                        boxShadow
                                        shadow={theme.shadows[16]}
                                    >
                                        <Box sx={{ p: 1, pb: 0 }}>
                                            <Stack sx={{ p: 1 }}>
                                                <Stack direction='row' spacing={0.5} alignItems='center'>
                                                    <Typography variant='h4'>Hi,</Typography>
                                                    <Typography component='span' variant='h4' sx={{ fontWeight: 400 }}>
                                                        {account?.fullName}
                                                    </Typography>
                                                    <Box sx={{ flexGrow: 1 }} />
                                                    <Grid item>
                                                        <Chip label={account?.role} size='small' color='secondary' />
                                                    </Grid>
                                                </Stack>
                                            </Stack>
                                            <Divider />
                                        </Box>
                                        <PerfectScrollbar
                                            style={{
                                                height: '100%',
                                                maxHeight: 'calc(100vh - 250px)',
                                                overflowX: 'hidden'
                                            }}
                                        >
                                            <Box sx={{ p: 1, pt: 0 }}>
                                                <List
                                                    component='nav'
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                            handleListItemClick(event, 0, `/profile/${account?.id}`)
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size='1.3rem' />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant='body2'>
                                                                    <FormattedMessage id='account-settings' />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>

                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        onClick={handlLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size='1.3rem' />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant='body2'>
                                                                    <FormattedMessage id='logout' />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
