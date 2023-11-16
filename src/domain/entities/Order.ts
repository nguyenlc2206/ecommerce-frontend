import { AxiosResponseCustom, KeyedObject } from '@ecommerce-frontend/src/common/types';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';

/** @todo: define Order model reponse */
export class OrderModel {
    id?: string;
    accountId?: string;
    orderItems?: Array<KeyedObject>;
    shippingAddress?: KeyedObject;
    paymentCharged?: KeyedObject;
    orderNumber?: string;
    paymentStatus?: string;
    paymentMethod?: string;
    totalPrice?: any;
    currency?: string;
    status?: string;
    deliveredAt?: Date;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    url?: string;
    account?: AccountModel;
    discounts?: KeyedObject;

    fromOrderModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
