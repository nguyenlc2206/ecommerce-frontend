import React, { cloneElement, useState, ReactElement } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons-react';
import MenuIcon from '@mui/icons-material/Menu';

// import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';
import ProfileSection from '@ecommerce-frontend/src/application/journey/layouts/client/Profile/ProflieSection';
import FloatingCart from '@ecommerce-frontend/src/application/journey/client/components/products/FloatingCart';

// elevation scroll
interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window!
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
        style: {
            backgroundColor:
                theme.palette.mode === 'dark' && trigger ? theme.palette.dark[800] : theme.palette.background.default,
            color: theme.palette.text.dark
        }
    });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
    /** init hooks */
    const navigate = useNavigate();
    const { account, isLoggedIn } = useSelector((state) => state.account);

    const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const drawerToggler = (open: boolean) => (event: any) => {
        if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    /** useEffect */
    React.useEffect(() => {
        // console.log(account, isLoggedIn);
        if (account?.role === 'admin') setIsAdmin(true);
    }, []);

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
                        <Typography component='div' sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <FloatingCart />
                        </Typography>
                        <Stack
                            direction='row'
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            spacing={{ xs: 1.5, md: 2.5 }}
                        >
                            <Button color='inherit' onClick={() => navigate('/')}>
                                Home
                            </Button>
                            <Button color='inherit' onClick={() => navigate('/products')}>
                                Product
                            </Button>
                            <Button color='inherit' component={Link} href='/contact' target='_blank'>
                                Contact
                            </Button>
                            {isAdmin && (
                                <Button color='inherit' component={RouterLink} to='/admin/users' target='_blank'>
                                    Dashboard
                                </Button>
                            )}
                            {!isLoggedIn ? (
                                <Button
                                    onClick={() => navigate('/login')}
                                    disableElevation
                                    variant='contained'
                                    color='secondary'
                                >
                                    Sign in
                                </Button>
                            ) : (
                                <ProfileSection />
                            )}
                        </Stack>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color='inherit' onClick={drawerToggler(true)} size='large'>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor='top' open={drawerToggle} onClose={drawerToggler(false)}>
                                {drawerToggle && (
                                    <Box
                                        sx={{ width: 'auto' }}
                                        role='presentation'
                                        onClick={drawerToggler(false)}
                                        onKeyDown={drawerToggler(false)}
                                    >
                                        <List>
                                            <Link style={{ textDecoration: 'none' }} href='/' target='_blank'>
                                                <ListItemButton component='a'>
                                                    <ListItemIcon>
                                                        <IconHome2 />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Home' />
                                                </ListItemButton>
                                            </Link>
                                            {isAdmin && (
                                                <Link
                                                    style={{ textDecoration: 'none' }}
                                                    href='/admin/users'
                                                    target='_blank'
                                                >
                                                    <ListItemButton component='a'>
                                                        <ListItemIcon>
                                                            <IconBook />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Dashboard' />
                                                    </ListItemButton>
                                                </Link>
                                            )}
                                            <Link style={{ textDecoration: 'none' }} href='/products'>
                                                <ListItemButton component='a'>
                                                    <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Product' />
                                                </ListItemButton>
                                            </Link>

                                            <Link style={{ textDecoration: 'none' }} href='/contact' target='_blank'>
                                                <ListItemButton component='a'>
                                                    <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Contact' />
                                                </ListItemButton>
                                            </Link>

                                            {!isLoggedIn ? (
                                                <Link style={{ textDecoration: 'none' }} href='/login' target='_blank'>
                                                    <ListItemButton component='a'>
                                                        <ListItemIcon>
                                                            <IconCreditCard />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Sign In' />
                                                    </ListItemButton>
                                                </Link>
                                            ) : (
                                                <></>
                                            )}
                                        </List>
                                    </Box>
                                )}
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
