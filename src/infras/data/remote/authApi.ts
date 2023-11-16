// import libs
import { Service } from 'typedi';

// import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

// ==============================|| AUTHENTICATION API ||============================== //
@Service()
export class AuthApi<T extends AccountModel> implements AuthRepository<T> {
    // * constructor
    constructor() {}

    /** overiding login method */
    async login(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/login', { ...entity });
        return response;
    }

    /** overiding register method */
    async register(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/register', { ...entity });
        return response;
    }

    /** overiding checkAccountMe method */
    async checkAccountMe(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/account-me');
        return response;
    }

    /** overiding changePassword method */
    async changePassword(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.patch('/api/v1/change-password', { ...entity });
        return response;
    }

    /** overiding forgotPassword method */
    async forgotPassword(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.patch('/api/v1/forgot-password', { ...entity });
        return response;
    }

    /** overiding verifyOTP method */
    async verifyOTP(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/verify-otp', { ...entity });
        return response;
    }

    /** overiding logout method */
    async logout(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/logout');
        return response;
    }

    /** overiding changePasswordAdmin method */
    async changePasswordAdmin(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.patch(`/api/v1/change-password/admin/${entity?.id}`, { ...entity.data });
        return response;
    }

    /** overiding emailSupport method */
    async emailSupport(entity: T): Promise<AxiosResponseCustom> {
        const response = await axios.post('/api/v1/email-support', { ...entity });
        return response;
    }
}
