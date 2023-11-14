// * import libs
import Container, { Service } from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AccountRepository } from '@ecommerce-frontend/src/domain/repository/account.repository';
import { AccountApi } from '@ecommerce-frontend/src/infras/data/remote/accountApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { getListUsers } from '@ecommerce-frontend/src/infras/data/store/reducers/user';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define getAll services */
export interface GetAllAccountService<Entity> {
    execute(): Promise<Either<AccountModel[], AppError>>;
}

// ==============================|| GETALL ACCOUNT SERVICE IMPLEMENT ||============================== //

@Service()
export class GetAllAccountServiceImpl<Entity extends AccountModel> implements GetAllAccountService<Entity> {
    private accountApi: AccountRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.accountApi = Container.get(AccountApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<AccountModel[], AppError>> {
        dispatch(setLoading(true));
        const res = await this.accountApi.getAll();
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
            dispatch(setLoading(false));
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new AccountModel();
        const result = _init.fromAccountModelGetAll(res);

        /** save data to redux */
        dispatch(getListUsers(result));
        dispatch(setLoading(false));
        return success(result as AccountModel[]);
    }
}
