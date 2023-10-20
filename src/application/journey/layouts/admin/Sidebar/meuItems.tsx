import { NavItemType } from '@ecommerce-frontend/src/common/types';
import dashboardNav from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/items/samplePage';
import usersNav from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/items/users';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboardNav, usersNav]
};

export default menuItems;
