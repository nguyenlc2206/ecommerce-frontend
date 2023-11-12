import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';

/** define product repository */
export interface ProductRepository<T> {
    getAll(): Promise<AxiosResponseCustom>;
    create(entity: T): Promise<AxiosResponseCustom>;
    getById(id: string): Promise<AxiosResponseCustom>;
    getAllSize(id: string): Promise<AxiosResponseCustom>;
    getByCategoryId(id: string): Promise<AxiosResponseCustom>;
    filter(entity: ProductsFilter): Promise<AxiosResponseCustom>;
    addProductCart(entity: T): Promise<AxiosResponseCustom>;
    query(entity: string): Promise<AxiosResponseCustom>;
    getCartByAccountId(): Promise<AxiosResponseCustom>;
    updateCart(entity: T): Promise<AxiosResponseCustom>;
    deleteCart(id: string): Promise<AxiosResponseCustom>;
}
