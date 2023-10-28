import { NavItemType } from '@ecommerce-frontend/src/common/types';
import dashboardNav from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/items/dashboard';
import usersNav from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/items/users';
import storeNav from '@ecommerce-frontend/src/application/journey/layouts/admin/Sidebar/items/store';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboardNav, usersNav, storeNav]
};

export default menuItems;
