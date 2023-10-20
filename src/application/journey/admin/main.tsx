import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// * import projects
import LAYOUT_CONST from '@ecommerce-frontend/src/constant';
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';
import { drawerWidth } from '@ecommerce-frontend/src/infras/data/store/constant';
import HeaderAdmin from '@ecommerce-frontend/src/application/journey/layouts/admin/Header';
import SidebarAdmin from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar';
import Breadcrumbs from '@ecommerce-frontend/src/application/journey/admin/components/Breadcrumbs';

// * import redux
import { useDispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import menuItems from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/meuItems';

interface MainStyleProps {
    theme: Theme;
    open: boolean;
    layout: string;
}

// styles
const Main: any = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, layout }: MainStyleProps) => ({
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ...(!open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter + 200
            }),
            [theme.breakpoints.up('md')]: {
                marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '12px',
                width: `calc(100% - ${drawerWidth}px)`,
                marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 72
            }
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200
            }),
            marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '2px' : 0,
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 72,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.up('md')]: {
                marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 72
            }
        }),
        [theme.breakpoints.down('md')]: {
            marginLeft: '2px',
            padding: '16px',
            marginTop: 72,
            ...(!open && {
                width: `calc(100% - ${drawerWidth}px)`
            })
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '2px',
            marginRight: '10px',
            padding: '16px',
            marginTop: 72,
            ...(!open && {
                width: `calc(100% - ${drawerWidth}px)`
            })
        }
    })
);

// ==============================|| MAIN ADMIN LAYOUT ||============================== //

const MainAdminLayout = () => {
    /** init theme */
    const theme = useTheme();
    /** init screen size */
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    /** init hooks */
    const dispatch = useDispatch();
    const { layout, container } = useConfig();

    const { drawerOpen } = useSelector((state) => state.menu);
    const { account } = useSelector((state) => state.account);

    /** init header */
    const header = useMemo(
        () => {
            return (
                <Toolbar sx={{ p: '16px' }}>
                    <HeaderAdmin />
                </Toolbar>
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchDownMd, account]
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{ bgcolor: theme.palette.background.default }}
            >
                {header}
            </AppBar>

            {/* drawer */}
            <SidebarAdmin />

            {/* main content */}
            <Main theme={theme} open={drawerOpen} layout={layout}>
                <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
                    {/* <Breadcrumbs separator={IconChevronRight} navigation={menuItems} icon title rightAlign /> */}
                    <Outlet />
                </Container>
            </Main>
        </Box>
    );
};

export default MainAdminLayout;
