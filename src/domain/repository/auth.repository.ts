import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define authentication repository */
export interface AuthRepository<T> {
    login(entity: T): Promise<AxiosResponseCustom>;
    checkAccountMe(): Promise<AxiosResponseCustom>;
    register(entity: T): Promise<AxiosResponseCustom>;
    changePassword(entity: T): Promise<AxiosResponseCustom>;
    changePasswordAdmin(entity: T): Promise<AxiosResponseCustom>;
    forgotPassword(entity: T): Promise<AxiosResponseCustom>;
    verifyOTP(entity: T): Promise<AxiosResponseCustom>;
    logout(): Promise<AxiosResponseCustom>;
}
