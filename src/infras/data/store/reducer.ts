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
    menu: menuReducer,
    account: accountReducer,
    user: userReducer,
    product: productReducer
});

export default reducer;
