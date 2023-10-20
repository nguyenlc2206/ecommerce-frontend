import { Service } from 'typedi';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AccountRepository } from '@ecommerce-frontend/src/domain/repository/account.repository';

// ==============================|| ACCOUNT API ||============================== //
@Service()
export class AccountApi<T extends AccountModel> implements AccountRepository<T> {
    // * constructor
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/account/getAll');
        return response;
    }

    /** overiding updateProfile method */
    async updateProfile(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post(`/api/v1/account/update/${entity?.id}`, { ...entity?.data });
        return response;
    }

    /** overiding getAccountById method */
    async getAccountById(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/account/${id}`);
        return response;
    }

    /** overiding delete method */
    async delete(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.delete(`/api/v1/account/${id}`);
        return response;
    }
}
