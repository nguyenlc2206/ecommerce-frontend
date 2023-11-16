// import libs
import { Service } from 'typedi';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { OrderRepository } from '@ecommerce-frontend/src/domain/repository/order.repository';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';

// ==============================|| ORDER API ||============================== //

@Service()
export class OrderApi<T extends OrderModel> implements OrderRepository<T> {
    // * constructor
    constructor() {}

    /** overiding create method */
    async create(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/order', { ...entity });
        return response;
    }

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/order/getAll');
        return response;
    }

    /** overiding getById method */
    async getById(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/order/${id}`);
        return response;
    }

    /** overiding getOrderMe method */
    async getOrderMe(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/order-me');
        return response;
    }
}
