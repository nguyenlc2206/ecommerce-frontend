import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define coupon repository */
export interface CouponRepository<T> {
    getByCode(code: string): Promise<AxiosResponseCustom>;
    getAll(): Promise<AxiosResponseCustom>;
    delete(id: string): Promise<AxiosResponseCustom>;
    active(id: string): Promise<AxiosResponseCustom>;
    create(entity: T): Promise<AxiosResponseCustom>;
}
