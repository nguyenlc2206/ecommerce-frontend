// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AccountRepository } from '@ecommerce-frontend/src/domain/repository/account.repository';
import { AccountApi } from '@ecommerce-frontend/src/infras/data/remote/accountApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { UPDATE } from '@ecommerce-frontend/src/infras/data/store/actions/account';

/** define UpdateMeProfileService services */
export interface UpdateMeProfileService<Entity> {
    execute(entity: Entity): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| UPDATE ME PROFILE SERVICE IMPLEMENT ||============================== //

export class UpdateMeProfileServiceImpl<Entity extends AccountModel> implements UpdateMeProfileService<Entity> {
    /** init API */
    private accountApi: AccountRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.accountApi = Container.get(AccountApi);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<AccountModel, AppError>> {
        const res = await this.accountApi.updateMe(entity);
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
        // * dispatch account
        const account = { ...res?.DT?.data } as AccountModel;
        dispatch({ type: UPDATE, payload: { account: account } });

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

        const _init = new AccountModel();
        const result = _init.fromAccountModel(res);

        return success(result as AccountModel);
    }
}
