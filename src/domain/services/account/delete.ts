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
import { GetAllService, GetAllServiceImpl } from './getAll';

/** define updateProfile services */
export interface DeleteService<Entity> {
    execute(id: string): Promise<Either<string, AppError>>;
}

// ==============================|| DELETE SERVICE IMPLEMENT ||============================== //

export class DeleteAccountServiceImpl<Entity extends AccountModel> implements DeleteService<Entity> {
    /** init api */
    private accountApi: AccountRepository<AccountModel>;
    /** init service */
    private getAllService: GetAllService<AccountModel>;

    // * init constructor
    constructor() {
        this.accountApi = Container.get(AccountApi);
        this.getAllService = Container.get(GetAllServiceImpl);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<string, AppError>> {
        const res = await this.accountApi.delete(id);
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
        /** get all account */
        this.getAllService.execute();

        return success('okie');
    }
}
