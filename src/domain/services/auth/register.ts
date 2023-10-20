import Container from 'typedi';

import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { REGISTER } from '@ecommerce-frontend/src/infras/data/store/actions/account';

/** define auth services */
export interface RegisterService<Entity> {
    execute(entity: Entity): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| AUTH SERVICE IMPLEMENT ||============================== //
export class RegisterServiceImpl<Entity extends AccountModel> implements RegisterService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<AccountModel, AppError>> {
        const res = await this.authApi.register(entity);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new AccountModel();
        const result = _init.fromAccountModelLogin(res);

        dispatch({
            type: REGISTER,
            payload: {
                account: { ...result }
            }
        });
        return success(result);
    }
}
