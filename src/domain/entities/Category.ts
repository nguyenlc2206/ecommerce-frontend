import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** @todo: define categỏy model reponse */
export class CategoryModel {
    id?: string;
    accountId?: string;
    name?: string;
    image?: string | ArrayBuffer;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    data?: CategoryModel;

    fromCategoryModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }

    fromCategoryModelGetAll?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
