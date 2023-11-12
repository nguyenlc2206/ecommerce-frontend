import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define coupon repository */
export interface CouponRepository<T> {
    getByCode(code: string): Promise<AxiosResponseCustom>;
}
