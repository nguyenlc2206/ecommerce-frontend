// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AccountRepository } from '@ecommerce-frontend/src/domain/repository/account.repository';
import { AccountApi } from '@ecommerce-frontend/src/infras/data/remote/accountApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { dispatch, store } from '@ecommerce-frontend/src/infras/data/store';
import { activeUser } from '@ecommerce-frontend/src/infras/data/store/reducers/user';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

import {
    GetAccountByIdService,
    GetAccountByIdServiceImpl
} from '@ecommerce-frontend/src/domain/services/account/getAccountById';
import { LOGIN } from '@ecommerce-frontend/src/infras/data/store/actions/account';

/** define UpdateAccount services */
export interface UpdateAccountService<Entity> {
    execute(entity: Entity): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| UPDATE ACCOUNT SERVICE IMPLEMENT ||============================== //

export class UpdateAccountServiceImpl<Entity extends AccountModel> implements UpdateAccountService<Entity> {
    private accountApi: AccountRepository<AccountModel>;
    /** init services */
    private getAccoutById: GetAccountByIdService<AccountModel>;

    // * init constructor
    constructor() {
        this.accountApi = Container.get(AccountApi);
        this.getAccoutById = Container.get(GetAccountByIdServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<AccountModel, AppError>> {
        const res = await this.accountApi.updateAccount(entity);
        if (res?.EC !== 200) {
            /** open snackbar alert */
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.EM,
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new AccountModel();
        const result = _init.fromAccountModelGetAll(res);

        /** save data to redux */
        dispatch(activeUser(result));

        /** open snackbar alert */
        dispatch(
            openSnackbar({
                open: true,
                message: res?.MS,
                variant: 'alert',
                alert: { color: 'success' },
                close: false
            })
        );

        /** update header */
        if (result?.id === store.getState().account.account?.id) {
            /** save data to redux */
            dispatch({ type: LOGIN, payload: { isLoggedIn: true, account: { ...result } } });
        }

        return success(result as AccountModel);
    }
}
