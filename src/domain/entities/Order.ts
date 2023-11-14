import { AxiosResponseCustom, KeyedObject } from '@ecommerce-frontend/src/common/types';

/** @todo: define Order model reponse */
export class OrderModel {
    id?: string;
    accountId?: string;
    orderItems?: Array<KeyedObject>;
    shippingAddress?: KeyedObject;
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

    fromOrderModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
