import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define account repository */
export interface AccountRepository<T> {
    getAll(): Promise<AxiosResponseCustom>;
    updateProfile(entity: T): Promise<AxiosResponseCustom>;
    getAccountById(id: string): Promise<AxiosResponseCustom>;
    delete(id: string): Promise<AxiosResponseCustom>;
    updateMe(entity: T): Promise<AxiosResponseCustom>;
}
