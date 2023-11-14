// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconCategory, IconList, IconShoppingCart, IconGiftCard } from '@tabler/icons-react';
import { NavItemType } from '@ecommerce-frontend/src/common/types';

// import redux
import { store } from '@ecommerce-frontend/src/infras/data/store/';

// constant
const icons = {
    IconCategory,
    IconList,
    IconShoppingCart,
    IconGiftCard
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const storeNav: NavItemType = {
    id: 'store',
    title: <FormattedMessage id='store' />,
    caption: <FormattedMessage id='store-caption' />,
    type: 'group',
    children: [
        {
            id: 'category',
            title: <FormattedMessage id='category' />,
            type: 'item',
            icon: icons.IconCategory,
            url: '/admin/categories'
        },
        {
            id: 'products',
            title: <FormattedMessage id='products' />,
            type: 'item',
            icon: icons.IconList,
            url: '/admin/products',
            breadcrumbs: store.getState().product.productSelect && true
        },
        {
            id: 'orders',
            title: <FormattedMessage id='orders' />,
            type: 'item',
            icon: icons.IconShoppingCart,
            url: '/admin/orders'
        },
        {
            id: 'coupons',
            title: <FormattedMessage id='coupons' />,
            type: 'item',
            icon: icons.IconGiftCard,
            url: '/admin/coupons'
        }
    ]
};

export default storeNav;
