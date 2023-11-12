import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define order repository */
export interface OrderRepository<T> {
    create(entity: T): Promise<AxiosResponseCustom>;
}
