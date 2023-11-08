import { Service } from 'typedi';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';

// ==============================|| CATEGORY API ||============================== //

@Service()
export class ProductApi<T extends ProductModel> implements ProductRepository<T> {
    // * constructor
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/product/getAll');
        return response;
    }

    /** overiding create method */
    async create(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post(`/api/v1/product`, { ...entity });
        return response;
    }

    /** overiding getById method */
    async getById(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/product/${id}`);
        return response;
    }

    /** overiding getAllSize method */
    async getAllSize(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/product/sizes/${id}`);
        return response;
    }

    /** overiding getByCategoryId method */
    async getByCategoryId(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/product?categoryId=${id}`);
        return response;
    }

    /** overiding filter methd */
    async filter(entity: ProductsFilter): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/product/filter', { ...entity });
        return response;
    }

    /** overiding add product cart method */
    async addProductCart(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/product/cart', { ...entity });
        return response;
    }
}
