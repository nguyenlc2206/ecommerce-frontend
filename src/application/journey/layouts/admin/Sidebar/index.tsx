// * import material ui
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// * import projects
import MiniDrawerStyled from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/components/MiniDrawerStyled';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// * import redux
import { useDispatch, useSelector } from '@ecommerce-frontend/src/infras/data/store';
import { drawerWidth } from '@ecommerce-frontend/src/infras/data/store/constant';
import MenuListItems from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/components/MenuList';
import { openDrawer } from '@ecommerce-frontend/src/infras/data/store/reducers/menu';

// ==============================|| SIDEBAR ADMIN DRAWER ||============================== //

const SidebarAdmin = () => {
    /** init theme */
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    /** init hooks */
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    /** style drawerSX */
    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 0 : '20px'
    };

    React.useEffect(() => {
        if (matchDownMd) dispatch(openDrawer(!drawerOpen));
    }, [matchDownMd]);

    return (
        <Box
            component='nav'
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
            aria-label='mailbox folders'
        >
            <MiniDrawerStyled variant='permanent' open={drawerOpen}>
                <Box sx={{ display: 'flex', p: 3.5 }}></Box>
                {matchDownMd ? (
                    <Box sx={drawerSX}>{<MenuListItems />}</Box>
                ) : (
                    <PerfectScrollbar
                        component='div'
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            ...drawerSX
                        }}
                    >
                        {<MenuListItems />}
                    </PerfectScrollbar>
                )}
            </MiniDrawerStyled>
        </Box>
    );
};

export default SidebarAdmin;
