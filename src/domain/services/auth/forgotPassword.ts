// ' import libs
import Container from 'typedi';

// * import projects
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';

// * import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { FORGOTPASSWORD } from '@ecommerce-frontend/src/infras/data/store/actions/account';

/** define auth services */
export interface ForgotPasswordService<Entity> {
    execute(entity: Entity): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| AUTH FORGOT PASSWORD SERVICE IMPLEMENT ||============================== //

export class ForgotPasswordServiceImpl<Entity extends AccountModel> implements ForgotPasswordService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding login method */
    async execute(entity: Entity): Promise<Either<AccountModel, AppError>> {
        const res = await this.authApi.forgotPassword(entity);
        // * error
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new AccountModel();
        const result = _init.fromAccountModel(res);

        // * dispatch account
        const account = { email: res?.DT?.data?.email } as AccountModel;
        dispatch({ type: FORGOTPASSWORD, payload: { isLoggedIn: false, account: account } });

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
