import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define product repository */
export interface ProductRepository<T> {
    getAll(): Promise<AxiosResponseCustom>;
    create(entity: T): Promise<AxiosResponseCustom>;
    getById(id: string): Promise<AxiosResponseCustom>;
    getAllSize(id: string): Promise<AxiosResponseCustom>;
}
