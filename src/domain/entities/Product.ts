import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';

/** @todo: define product model reponse */
export class ProductModel {
    id?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    sizes?: Array<string>;
    color?: string;
    images?: Array<string>;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    category?: {
        id: string;
        name: string;
    };
    size?: string;
    price?: number;
    totalQty?: number;
    totalSold?: number;
    products?: any;
    filter?: ProductsFilter;

    fromProductModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
