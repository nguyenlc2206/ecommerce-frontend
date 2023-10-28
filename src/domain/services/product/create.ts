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
import { GetAllProductService, GetAllProductServiceImpl } from '@ecommerce-frontend/src/domain/services/product/getAll';

/** define auth services */
export interface CreateProductService<Entity> {
    execute(entity: Entity): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| CREATE CATEGORY IMPLEMENT ||============================== //

@Service()
export class CreateProductServiceImpl<Entity extends ProductModel> implements CreateProductService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;
    protected getAllProductService: GetAllProductService<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
        this.getAllProductService = Container.get(GetAllProductServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<ProductModel, AppError>> {
        const res = await this.productApi.create(entity);
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
        this.getAllProductService.execute();

        return success(result);
    }
}
