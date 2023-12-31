// * import libs
import Container, { Service } from 'typedi';

// * import projects
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { getListProductSizes } from '@ecommerce-frontend/src/infras/data/store/reducers/product';

/** define getAll services */
export interface GetAllProductSizeService<Entity> {
    execute(id: string): Promise<Either<ProductModel[], AppError>>;
}

// ==============================|| GETALL PRODUCT SERVICE IMPLEMENT ||============================== //

@Service()
export class GetAllProductSizeServiceImpl<Entity extends ProductModel> implements GetAllProductSizeService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<ProductModel[], AppError>> {
        const res = await this.productApi.getAllSize(id);
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
        dispatch(getListProductSizes(result));

        return success(result as ProductModel[]);
    }
}
