import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// reducer - state management
import { LOGIN, LOGOUT } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import accountReducer from '@ecommerce-frontend/src/infras/data/store/reducers/account';

// import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import Loader from '@ecommerce-frontend/src/common/functions/Loader';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// types
import { InitialLoginContextProps, JWTContextType } from '@ecommerce-frontend/src/common/types/auth';

// import services
import { LoginServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/login';
import { RegisterServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/register';
import { CheckAccountMeServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/checkAccountMe';
import { ChangePasswordServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/changePassword';
import { ForgotPasswordServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/forgotPassword';
import { VerifyOTPServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/verifyOTP';
import { LogoutServiceImpl } from '@ecommerce-frontend/src/domain/services/auth/logout';
import { UpdateProfileServiceImpl } from '@ecommerce-frontend/src/domain/services/account/update';
import { DeleteAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/delete';
import { useSelector } from '@ecommerce-frontend/src/infras/data/store';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    account: null
};

export const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        window.localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        window.localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = React.createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    /** init hooks */
    const { account } = useSelector((state) => state.account);
    const [state, dispatch] = React.useReducer(accountReducer, initialState);

    React.useEffect(() => {}, []);

    /** overding login function */
    const login = async (email: string, password: string): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const loginService = new LoginServiceImpl();
        // * call service login
        const res = await loginService.login({ email: email, password: password } as AccountModel);
        if (res.isFailure()) return failure(res.error);
        // * processing data
        const { accessToken: serviceToken } = res.data;
        window.localStorage.setItem('serviceToken', serviceToken);
        return success(res.data);
    };

    /** overiding logout function */
    const logout = async (): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const logoutService = new LogoutServiceImpl();
        // * call service logout
        const res = await logoutService.execute();
        if (res.isFailure()) return failure(res.error);
        // * processing data
        window.localStorage.removeItem('serviceToken');
        return success(res.data);
    };

    /** overding register function */
    const register = async (
        fullName: string,
        email: string,
        phoneNo: string,
        password: string,
        passwordConfirm: string,
        avatar?: string
    ): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const registerService = new RegisterServiceImpl();
        // * call service login
        const res = await registerService.execute({
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            fullName: fullName ? fullName : email,
            phoneNo: phoneNo,
            avatar: avatar
        } as AccountModel);
        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success(res.data);
    };

    /** overding changePassword function */
    const changePassword = async (
        passwordCurrent: string,
        password: string,
        passwordConfirm: string
    ): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const changePasswordService = new ChangePasswordServiceImpl();
        // * call service changepassword
        const res = await changePasswordService.execute({
            passwordCurrent: passwordCurrent,
            password: password,
            passwordConfirm: passwordConfirm
        } as AccountModel);
        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success(res.data);
    };

    /** overiding forgotPassword function */
    const forgotPassword = async (email: string): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const forgotPasswordService = new ForgotPasswordServiceImpl();
        // * call service changepassword
        const res = await forgotPasswordService.execute({
            email: email
        } as AccountModel);
        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success(res.data);
    };

    /** overiding verifyOTP method */
    const verifyOTP = async (
        OTP: string,
        password: string,
        passwordConfirm: string
    ): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const verifyOTPSerivce = new VerifyOTPServiceImpl();
        // * call service verifyOTP
        const res = await verifyOTPSerivce.execute({
            email: account?.email,
            password: password,
            passwordConfirm: passwordConfirm,
            OTP: OTP,
            OTPType: 'OTPForgotPassword'
        } as AccountModel);

        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success(res.data);
    };

    /** overiding updateProfile function */
    const updateProfile = async (entity: AccountModel): Promise<Either<AccountModel, AppError>> => {
        /** init services */
        const updateProfileService = new UpdateProfileServiceImpl();
        // * call service changepassword
        const res = await updateProfileService.execute(entity);
        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success(res.data);
    };

    /** overiding updateMe function */
    const updateMe = async (): Promise<Either<AccountModel, AppError>> => {
        return success({} as AccountModel);
    };

    /** overiding delete function */
    const deleteAccount = async (id: string): Promise<Either<string, AppError>> => {
        /** init services */
        const deleteAccountService = new DeleteAccountServiceImpl();
        // * call service changepassword
        const res = await deleteAccountService.execute(id);
        // * error
        if (res.isFailure()) return failure(res.error);
        // * success
        return success('okie');
    };

    return (
        <JWTContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                changePassword,
                forgotPassword,
                verifyOTP,
                updateProfile,
                updateMe,
                deleteAccount
            }}
        >
            {children}
        </JWTContext.Provider>
    );
};

export default JWTContext;
