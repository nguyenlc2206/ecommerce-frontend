import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define account repository */
export interface AccountRepository<T> {
    getAll(): Promise<AxiosResponseCustom>;
    getAccountById(id: string): Promise<AxiosResponseCustom>;
    delete(id: string): Promise<AxiosResponseCustom>;
    updateMe(entity: T): Promise<AxiosResponseCustom>;
    updateAccount(entity: T): Promise<AxiosResponseCustom>;
    activeAccount(id: string): Promise<AxiosResponseCustom>;
}
