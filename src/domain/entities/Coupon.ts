import { AxiosResponseCustom, KeyedObject } from '@ecommerce-frontend/src/common/types';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';

/** @todo: define Coupon model reponse */
export class CouponModel {
    id?: string;
    code?: string;
    startDate?: any;
    endDate?: any;
    discount?: number;
    type?: string;
    accountId?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    account?: AccountModel;
    accountIdExpires?: Array<string>;
    discounts?: KeyedObject;
    billingAddress?: KeyedObject;

    fromCouponModel(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
