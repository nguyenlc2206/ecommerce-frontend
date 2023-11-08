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

/** define getAll services */
export interface GetProductByCategoryIdService<Entity> {
    execute(id: string): Promise<Either<ProductModel[], AppError>>;
}

// ==============================|| GET PRODUCT BY ID SERVICE IMPLEMENT ||============================== //

export class GetProductByCategoryIdServiceImpl<Entity extends ProductModel>
    implements GetProductByCategoryIdService<Entity>
{
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<ProductModel[], AppError>> {
        const res = await this.productApi.getByCategoryId(id);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        console.log('>>>Check res:', res);
        // const _init = new ProductModel();
        // const result = _init.fromProductModel(res);
        // /** save data to redux */
        // dispatch(activeProduct(result));

        return success([] as ProductModel[]);
    }
}
