// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// import redux
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import {
    addProduct,
    setBillingAddress,
    setDiscount,
    setStep
} from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define getAll services */
export interface UpdateCartService<Entity> {
    execute(entity: Entity): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| GET PRODUCT BY ID SERVICE IMPLEMENT ||============================== //

export class UpdateCartServiceImpl<Entity extends ProductModel> implements UpdateCartService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<ProductModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.productApi.updateCart(entity);
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

        // alert add to cart success
        dispatch(
            openSnackbar({
                open: true,
                message: res.MS,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
        // get data response
        const _init = new ProductModel();
        const result = _init.fromProductModel(res);

        // check product cart with account Id
        dispatch(addProduct(result?.products));
        dispatch(setDiscount(result?.discounts));
        dispatch(setStep(result?.status));
        dispatch(setBillingAddress(result?.billingAddress));
        dispatch(setLoading(false));
        return success(result);
    }
}
