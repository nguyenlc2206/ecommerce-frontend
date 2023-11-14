import { Service } from 'typedi';
import * as _ from 'lodash';
import fs from 'fs';

// * import projects
import axios from '@ecommerce-frontend/src/common/utils/axios';
import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AccountRepository } from '@ecommerce-frontend/src/domain/repository/account.repository';

// ==============================|| ACCOUNT API ||============================== //
@Service()
export class AccountApi<T extends AccountModel> implements AccountRepository<T> {
    // * constructor
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<AxiosResponseCustom> {
        const response = await axios.get('/api/v1/account/getAll');
        return response;
    }

    /** overiding updateMe method */
    async updateMe(entity: T): Promise<AxiosResponseCustom> {
        const formData = new FormData();
        if (!entity?.avatar) {
            formData.append('fullName', entity?.fullName);
            formData.append('phoneNo', entity?.phoneNo);
            formData.append('email', entity?.email);
        } else {
            formData.append('fullName', entity?.fullName);
            formData.append('phoneNo', entity?.phoneNo);
            formData.append('email', entity?.email);
            formData.append('avatar', entity?.avatar, entity?.avatar?.name);
        }
        const response = await axios.post('/api/v1/account/update-me', formData);
        return response;
    }

    /** overiding getAccountById method */
    async getAccountById(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/account/${id}`);
        return response;
    }

    /** overiding delete method */
    async delete(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.delete(`/api/v1/account/${id}`);
        return response;
    }

    /** overiding updateAccount method */
    async updateAccount(entity: T): Promise<AxiosResponseCustom> {
        const formData = new FormData();
        if (!entity?.avatar) {
            formData.append('fullName', entity?.fullName);
            formData.append('phoneNo', entity?.phoneNo);
            formData.append('email', entity?.email);
        } else {
            formData.append('fullName', entity?.fullName);
            formData.append('phoneNo', entity?.phoneNo);
            formData.append('email', entity?.email);
            formData.append('avatar', entity?.avatar, entity?.avatar?.name);
        }
        const response = await axios.post(`/api/v1/account/update/${entity?.id}`, formData);
        return response;
    }

    /** overiding active account */
    async activeAccount(id: string): Promise<AxiosResponseCustom> {
        const response = await axios.get(`/api/v1/account/active/${id}`);
        return response;
    }
}
