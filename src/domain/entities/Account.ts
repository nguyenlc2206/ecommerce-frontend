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
        return {
            id: res?.DT?.data?.id,
            fullName: res?.DT?.data?.fullName,
            phoneNo: res?.DT?.data?.phoneNo,
            email: res?.DT?.data?.email,
            role: res?.DT?.data?.role,
            avatar: res?.DT?.data?.avatar,
            accessToken: res?.DT?.data?.accessToken,
            shippingAddress: res?.DT?.data?.shippingAddress,
            cart: res?.DT?.data?.cart
        } as AccountModel;
    }

    fromAccountModelGetAll?(res: AxiosResponseCustom) {
        const result = { ...res?.DT?.data };
        return result;
    }
}
