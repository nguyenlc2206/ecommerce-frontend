// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUsers, IconBuildingStore } from '@tabler/icons-react';
import { NavItemType } from '@ecommerce-frontend/src/common/types';

// constant
const icons = {
    IconUsers,
    IconBuildingStore
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const usersNav: NavItemType = {
    id: 'manager',
    title: <FormattedMessage id='manager' />,
    caption: <FormattedMessage id='manager-caption' />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id='users' />,
            icon: icons.IconUsers,
            type: 'item',
            url: '/admin/users'
        }
    ]
};

export default usersNav;
