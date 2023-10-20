// * import libs
import 'reflect-metadata';
import { Container } from 'typedi';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import { AccountApi } from '@ecommerce-frontend/src/infras/data/remote/accountApi';

// * init service
import { GetAllServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAll';
import { GetAccountByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAccountById';

// ==============================||  INJECTTION INIT ||============================== //
const InjectionInit = () => {
    // * define auth api
    Container.set(AuthApi, new AuthApi());
    Container.set(AccountApi, new AccountApi());

    // * define services
    Container.set(GetAllServiceImpl, new GetAllServiceImpl());
    Container.set(GetAccountByIdServiceImpl, new GetAccountByIdServiceImpl());
};

export default InjectionInit;
