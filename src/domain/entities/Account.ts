import { AxiosResponseCustom, KeyedObject } from '@ecommerce-frontend/src/common/types';

/** @todo: define account model reponse */
export class AccountModel {
    id?: string;
    fullName?: string;
    phoneNo?: string;
    avatar?: any;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    passwordCurrent?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    accessToken?: string;
    passwordChangedAt?: Date;
    OTP?: string;
    OTPType?: string;
    isDeleted?: boolean;
    data?: AccountModel;
    shippingAddress?: KeyedObject;
    cart?: KeyedObject;

    fromAccountModel?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }

    fromAccountModelGetAll?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
