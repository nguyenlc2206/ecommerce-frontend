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
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { setDisplayType } from '@ecommerce-frontend/src/infras/data/store/reducers/order';

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
        dispatch(setLoading(true));
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
            dispatch(setLoading(false));
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new AccountModel();
        const result = _init.fromAccountModel(res);

        // // check role admin
        // if (result?.role === 'admin') dispatch(setDisplayType('orderAdmin'));

        // check account block
        if (result?.isDeleted || !result) {
            dispatch({ type: LOGOUT });
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Account is block. Please contact admin to unlock account!',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            dispatch(setLoading(false));
            return failure(new AppError('Account is block. Please contact admin to unlock account!', 400));
        }
        // check product cart with account Id
        dispatch(addProduct(result?.cart?.products));
        dispatch(setStep(result?.cart?.status));
        dispatch(setLoading(false));
        return success(result);
    }
}
