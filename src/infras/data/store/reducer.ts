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

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: persistReducer(
        {
            key: 'snack',
            storage,
            keyPrefix: 'ecommerce-'
        },
        snackbarReducer
    ),
    menu: menuReducer,
    account: accountReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer
});

export default reducer;
