import Container from 'typedi';

import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { LOGOUT } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import { addProduct, setStep } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';

/** define auth services */
export interface CheckAccountMeService<Entity> {
    execute(): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| CHECK ACCOUNT SERVICE IMPLEMENT ||============================== //
export class CheckAccountMeServiceImpl<Entity extends AccountModel> implements CheckAccountMeService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<AccountModel, AppError>> {
        const res = await this.authApi.checkAccountMe();
        if (res?.EC === 402 || res?.EC === 401) {
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
            /** save data to redux */
            dispatch({ type: LOGOUT });
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new AccountModel();
        const result = _init.fromAccountModel(res);

        // check product cart with account Id
        dispatch(addProduct(result?.cart?.products));
        dispatch(setStep(result?.cart?.status));

        return success(result);
    }
}
