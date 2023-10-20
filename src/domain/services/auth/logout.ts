// ' import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { LOGOUT } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

/** define auth services */
export interface LogoutService<Entity> {
    execute(): Promise<Either<AccountModel, Error>>;
}

// ==============================|| AUTH LOGOUT SERVICE IMPLEMENT ||============================== //

export class LogoutServiceImpl<Entity extends AccountModel> implements LogoutService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<AccountModel, AppError>> {
        const res = await this.authApi.logout();
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new AccountModel();
        const result = _init.fromAccountModelLogin(res);

        /** save data to redux */
        dispatch({ type: LOGOUT });

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

        return success(result);
    }
}
