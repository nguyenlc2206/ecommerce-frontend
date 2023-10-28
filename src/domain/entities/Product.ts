import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** @todo: define product model reponse */
export class ProductModel {
    id?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    sizes?: Array<{
        size: string;
        price: number;
        totalQty: number;
        discount: number;
    }>;
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

    fromProductModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
