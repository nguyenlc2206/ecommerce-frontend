// project imports
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { Either } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

export interface JWTDataProps {
    accountId: string;
}

export type JWTContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    accessToken?: string;
    account?: AccountModel | null | undefined;
    logout: () => Promise<Either<AccountModel, AppError>>;
    login: (email: string, password: string) => Promise<Either<AccountModel, AppError>>;
    register: (
        fullName: string,
        email: string,
        phoneNo: string,
        password: string,
        passwordConfirm: string,
        avatar?: string
    ) => Promise<Either<AccountModel, AppError>>;
    changePassword: (
        passwordCurrent: string,
        password: string,
        passwordConfirm: string
    ) => Promise<Either<AccountModel, AppError>>;
    forgotPassword: (email: string) => Promise<Either<AccountModel, AppError>>;
    verifyOTP: (password: string, passwordConfirm: string, OTP: string) => Promise<Either<AccountModel, AppError>>;
    updateProfile: (entity: AccountModel) => Promise<Either<AccountModel, AppError>>;
    updateMe: (entity: AccountModel) => Promise<Either<AccountModel, AppError>>;
    deleteAccount: (id: string) => Promise<Either<string, AppError>>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    account?: AccountModel | null | undefined;
}
