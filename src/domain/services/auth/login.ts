// ' import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { LOGIN } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { activeItem } from '@ecommerce-frontend/src/infras/data/store/reducers/menu';

/** define auth services */
export interface LoginService<Entity> {
    login(entity: Entity): Promise<Either<AccountModel, Error>>;
}

// ==============================|| AUTH LOGIN SERVICE IMPLEMENT ||============================== //

export class LoginServiceImpl<Entity extends AccountModel> implements LoginService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding login method */
    async login(entity: Entity): Promise<Either<AccountModel, AppError>> {
        const res = await this.authApi.login(entity);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new AccountModel();
        const result = _init.fromAccountModel(res);

        /** save data to redux */
        dispatch({ type: LOGIN, payload: { isLoggedIn: true, account: { ...result } } });

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

        /** dispatch dashboard */
        dispatch(activeItem(['dashboard']));
        window.localStorage.clear();
        return success(result);
    }
}
