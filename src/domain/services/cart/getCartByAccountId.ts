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
import {
    addProduct,
    setBillingAddress,
    setDiscount,
    setStep
} from '@ecommerce-frontend/src/infras/data/store/reducers/cart';

/** define getAll services */
export interface GetCartByAccountIdService<Entity> {
    execute(): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| GET PRODUCT BY ID SERVICE IMPLEMENT ||============================== //

export class GetCartByAccountIdServiceImpl<Entity extends ProductModel> implements GetCartByAccountIdService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<ProductModel, AppError>> {
        const res = await this.productApi.getCartByAccountId();
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new ProductModel();
        const result = _init.fromProductModel(res);
        /** save data to redux */
        dispatch(addProduct(result?.products));
        dispatch(setDiscount(result?.discounts));
        dispatch(setStep(result?.status));
        dispatch(setBillingAddress(result?.billingAddress));

        return success(result as ProductModel);
    }
}
