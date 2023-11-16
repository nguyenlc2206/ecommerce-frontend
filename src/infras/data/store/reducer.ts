// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// project imports
import accountReducer from '@ecommerce-frontend/src/infras/data/store/reducers/account';
import snackbarReducer from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import menuReducer from '@ecommerce-frontend/src/infras/data/store/reducers/menu';
import userReducer from '@ecommerce-frontend/src/infras/data/store/reducers/user';
import categoryReducer from '@ecommerce-frontend/src/infras/data/store/reducers/category';
import productReducer from '@ecommerce-frontend/src/infras/data/store/reducers/product';
import cartReducer from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import pageReducer from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import orderReducer from '@ecommerce-frontend/src/infras/data/store/reducers/order';
import couponReducer from '@ecommerce-frontend/src/infras/data/store/reducers/coupon';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'ecommerce-'
        },
        cartReducer
    ),
    category: persistReducer(
        {
            key: 'category',
            storage,
            keyPrefix: 'ecommerce-'
        },
        categoryReducer
    ),
    snackbar: snackbarReducer,
    menu: persistReducer(
        {
            key: 'menu',
            storage,
            keyPrefix: 'ecommerce-'
        },
        menuReducer
    ),
    account: accountReducer,
    user: persistReducer(
        {
            key: 'user',
            storage,
            keyPrefix: 'ecommerce-'
        },
        userReducer
    ),
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
    coupon: couponReducer
});

export default reducer;
