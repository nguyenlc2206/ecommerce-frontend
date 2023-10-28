// * import material ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';

// * import redux
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

import menuItems from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/meuItems';
import { NavItemType } from '@ecommerce-frontend/src/common/types';
import { HORIZONTAL_MAX_ITEM } from '@ecommerce-frontend/src/config';
import useConfig from '@ecommerce-frontend/src/common/hooks/useConfig';
import LAYOUT_CONST from '@ecommerce-frontend/src/constant';

import NavItem from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/components/NavItem';
import NavGroup from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/components/NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuListItems = () => {
    /** init theme */
    const theme = useTheme();
    const { layout } = useConfig();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    /** init variables */
    const { drawerOpen } = useSelector((state) => state.menu);

    const lastItem = HORIZONTAL_MAX_ITEM;
    let lastItemIndex = menuItems.items.length - 1;
    let remItems: NavItemType[] = [];
    let lastItemId: string;

    if (lastItem && lastItem < menuItems.items.length) {
        lastItemId = menuItems.items[lastItem - 1].id!;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
        switch (item.type) {
            case 'group':
                if (item.url && item.id !== lastItemId) {
                    return (
                        <List key={item.id}>
                            <NavItem item={item} level={1} isParents />
                            {layout !== LAYOUT_CONST.HORIZONTAL_LAYOUT && <Divider sx={{ py: 0.5 }} />}
                        </List>
                    );
                }

                return (
                    <NavGroup
                        key={item.id}
                        item={item}
                        lastItem={lastItem!}
                        remItems={remItems}
                        lastItemId={lastItemId}
                    />
                );
            default:
                return (
                    <Typography key={item.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>;
};

export default MenuListItems;
