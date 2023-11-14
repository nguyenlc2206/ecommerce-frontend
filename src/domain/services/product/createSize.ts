// * import libs
import Container, { Service } from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import {
    GetProductByIdService,
    GetProductByIdServiceImpl
} from '@ecommerce-frontend/src/domain/services/product/getById';

/** define auth services */
export interface CreateProductSizeService<Entity> {
    execute(entity: Entity): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| CREATE SIZE PRODUCT IMPLEMENT ||============================== //

@Service()
export class CreateProductSizeServiceImpl<Entity extends ProductModel> implements CreateProductSizeService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;
    protected getProductById: GetProductByIdService<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
        this.getProductById = Container.get(GetProductByIdServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<ProductModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.productApi.createSizeProduct(entity);
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

        const _init = new ProductModel();
        const result = _init.fromProductModel(res);

        dispatch(
            openSnackbar({
                open: true,
                message: res?.MS,
                variant: 'alert',
                alert: { color: 'success' },
                close: false
            })
        );
        /** fetch return */
        const _res = await this.getProductById.execute(result?.productId);
        dispatch(setLoading(false));
        return success(result);
    }
}
