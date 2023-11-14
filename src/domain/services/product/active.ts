// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { GetAllProductService, GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';

// import redux
import { dispatch, store } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define updateProfile services */
export interface ActiveProductService<Entity> {
    execute(id: string): Promise<Either<string, AppError>>;
}

// ==============================|| ACTIVE PRODUCT SERVICE IMPLEMENT ||============================== //

export class ActiveProductServiceImpl<Entity extends ProductModel> implements ActiveProductService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;
    protected getAllProductService: GetAllProductService<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
        this.getAllProductService = Container.get(GetAllProductServiceImpl);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<string, AppError>> {
        dispatch(setLoading(true));
        const res = await this.productApi.activeProduct(id);
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
        const _res = await this.getAllProductService.execute();
        return success('okie');
    }
}
