import { Service } from 'typedi';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

// ==============================|| CATEGORY API ||============================== //

@Service()
export class CategoryApi<T extends CategoryModel> implements CategoryRepository<T> {
    // * constructor
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/category/getAll');
        return response;
    }

    /** overiding getById method */
    async getById(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/category/${id}`);
        return response;
    }

    /** overiding create method */
    async create(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post(`/api/v1/category`, { ...entity });
        return response;
    }

    /** overiding delete method */
    async delete(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.delete(`/api/v1/category/${id}`);
        return response;
    }
}
