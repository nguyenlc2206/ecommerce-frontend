// * import libs
import 'reflect-metadata';
import { Container } from 'typedi';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import { AccountApi } from '@ecommerce-frontend/src/infras/data/remote/accountApi';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';

// * init service
import { GetAllAccountServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAll';
import { GetAccountByIdServiceImpl } from '@ecommerce-frontend/src/domain/services/account/getAccountById';
import { GetAllCategoryServiceImpl } from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';
import { GetAllProductSizeServiceImpl } from './domain/services/product/getAllSize';

// ==============================||  INJECTTION INIT ||============================== //
const InjectionInit = () => {
    // * define auth api
    Container.set(AuthApi, new AuthApi());
    Container.set(AccountApi, new AccountApi());
    Container.set(CategoryApi, new CategoryApi());
    Container.set(ProductApi, new ProductApi());

    // * define services
    Container.set(GetAllAccountServiceImpl, new GetAllAccountServiceImpl());
    Container.set(GetAccountByIdServiceImpl, new GetAccountByIdServiceImpl());
    Container.set(GetAllCategoryServiceImpl, new GetAllCategoryServiceImpl());
    Container.set(GetAllProductServiceImpl, new GetAllProductServiceImpl());
    Container.set(GetAllProductSizeServiceImpl, new GetAllProductSizeServiceImpl());
};

export default InjectionInit;
