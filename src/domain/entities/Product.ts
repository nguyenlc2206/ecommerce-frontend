import { AxiosResponseCustom, KeyedObject } from '@ecommerce-frontend/src/common/types';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';

/** @todo: define product model reponse */
export class ProductModel {
    id?: string;
    productId?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    sizes?: any;
    image?: string;
    images?: any;
    discount?: number;
    qty?: number;
    colors?: Array<string>;
    color?: string;
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
    sizeId?: number;
    status?: string;
    discounts?: KeyedObject;
    billingAddress?: KeyedObject;
    product?: KeyedObject;

    fromProductModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
