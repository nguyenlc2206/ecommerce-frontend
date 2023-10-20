// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome } from '@tabler/icons-react';

// type
import { NavItemType } from '@ecommerce-frontend/src/common/types';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconBrandChrome
};

const dashboardNav: NavItemType = {
    id: 'dashboard',
    title: <FormattedMessage id='dashboard' />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id='dashboard' />,
            icon: icons.IconBrandChrome,
            type: 'item',
            url: '/admin'
        }
    ]
};

export default dashboardNav;
