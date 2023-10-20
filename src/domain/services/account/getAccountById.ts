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
import { activeUser } from '@ecommerce-frontend/src/infras/data/store/reducers/user';

/** define getAll services */
export interface GetAccountByIdService<Entity> {
    execute(id: string): Promise<Either<AccountModel, AppError>>;
}

// ==============================|| GET ACCOUNT BY ID SERVICE IMPLEMENT ||============================== //

export class GetAccountByIdServiceImpl<Entity extends AccountModel> implements GetAccountByIdService<Entity> {
    /** init api */
    private accountApi: AccountRepository<AccountModel>;

    // * init constructor
    constructor() {
        this.accountApi = Container.get(AccountApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<AccountModel, AppError>> {
        const res = await this.accountApi.getAccountById(id);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new AccountModel();
        const result = _init.fromAccountModelGetAll(res);

        /** save data to redux */
        dispatch(activeUser(result));

        return success(result as AccountModel);
    }
}
