// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { activeProduct } from '@ecommerce-frontend/src/infras/data/store/reducers/product';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

/** define getAll services */
export interface GetProductByIdService<Entity> {
    execute(id: string): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| GET PRODUCT BY ID SERVICE IMPLEMENT ||============================== //

export class GetProductByIdServiceImpl<Entity extends ProductModel> implements GetProductByIdService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<ProductModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.productApi.getById(id);
        if (res?.EC !== 200) {
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

        const _init = new ProductModel();
        const result = _init.fromProductModel(res);
        /** save data to redux */
        dispatch(activeProduct(result));
        dispatch(setLoading(false));

        return success(result as ProductModel);
    }
}
