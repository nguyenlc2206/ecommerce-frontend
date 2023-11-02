// action - state management
import { LOGIN, LOGOUT, REGISTER, FORGOTPASSWORD } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import { InitialLoginContextProps } from '@ecommerce-frontend/src/common/types/auth';

// ==============================|| ACCOUNT REDUCER ||============================== //

type AccountReducerActionProps = {
    type: string;
    payload?: InitialLoginContextProps;
};

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    account: null
};

// * definr account reducer
const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
        case FORGOTPASSWORD: {
            const { account } = action.payload!;
            return {
                ...state,
                account
            };
        }
        case REGISTER: {
            const { account } = action.payload!;
            return {
                ...state,
                account
            };
        }
        case LOGIN: {
            const { account } = action.payload!;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                account
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                account: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
