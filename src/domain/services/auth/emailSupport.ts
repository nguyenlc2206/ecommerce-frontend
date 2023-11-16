// ' import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define auth services */
export interface EmailSupportService<Entity> {
    execute(entity: Entity): Promise<Either<AccountModel, Error>>;
}

// ==============================|| EMAIL SUPPORT SERVICE IMPLEMENT ||============================== //

export class EmailSupportServiceImpl<Entity extends AccountModel> implements EmailSupportService<Entity> {
    private authApi: AuthRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.authApi = Container.get(AuthApi);
    }

    /** overiding login method */
    async execute(entity: Entity): Promise<Either<AccountModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.authApi.emailSupport(entity);
        if (res?.EC !== 200) {
            /** open snackbar alert */
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.EC,
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            dispatch(setLoading(false));
            return failure(new AppError(res?.EM, res?.EC));
        }

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
        dispatch(setLoading(false));
        return success({});
    }
}
