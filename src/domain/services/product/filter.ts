// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { ProductsFilter } from '@ecommerce-frontend/src/common/types/e-commerce';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { getListProducts } from '@ecommerce-frontend/src/infras/data/store/reducers/product';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

/** define getAll services */
export interface FilterProductsService<Entity> {
    execute(entity: ProductsFilter): Promise<Either<ProductModel[], AppError>>;
}

// ==============================|| GET PRODUCT BY ID SERVICE IMPLEMENT ||============================== //

export class FilterProductsServiceImpl<Entity extends ProductModel> implements FilterProductsService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(entity: ProductsFilter): Promise<Either<ProductModel[], AppError>> {
        const res = await this.productApi.filter(entity);
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

        const _init = new ProductModel();
        const result = _init.fromProductModel(res);

        /** save data to redux */
        dispatch(getListProducts(result));

        return success([] as ProductModel[]);
    }
}
