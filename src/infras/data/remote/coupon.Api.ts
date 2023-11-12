import { Service } from 'typedi';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { CouponRepository } from '@ecommerce-frontend/src/domain/repository/coupon.repository';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';

// ==============================|| COUPON API ||============================== //

@Service()
export class CouponApi<T extends CouponModel> implements CouponRepository<T> {
    // * constructor
    constructor() {}

    /** overiding getByCode method */
    async getByCode(code: string): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/discount', { codes: code });
        return response;
    }
}
