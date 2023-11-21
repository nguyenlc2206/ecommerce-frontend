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

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/coupon/getAll');
        return response;
    }

    /** overiding delete method */
    async delete(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.delete(`/api/v1/coupon/${id}`);
        return response;
    }

    /** overiding active coupon */
    async active(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/coupon/active/${id}`);
        return response;
    }

    /** overiding create coupon */
    async create(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/coupon', { ...entity });
        return response;
    }
}
