// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import {
    GetCartByAccountIdService,
    GetCartByAccountIdServiceImpl
} from '@ecommerce-frontend/src/domain/services/cart/getCartByAccountId';

// import redux
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';

/** define getAll services */
export interface DeleteCartService<Entity> {
    execute(id: string): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| DELETE CART BY ID SERVICE IMPLEMENT ||============================== //

export class DeleteCartServiceImpl<Entity extends ProductModel> implements DeleteCartService<Entity> {
    /** init api */
    protected productApi: ProductRepository<ProductModel>;
    protected getCartByAccountId: GetCartByAccountIdService<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
        this.getCartByAccountId = Container.get(GetCartByAccountIdServiceImpl);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<ProductModel, AppError>> {
        const res = await this.productApi.deleteCart(id);
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

        // get restore cart
        const resCart = await this.getCartByAccountId.execute();

        return success({} as ProductModel);
    }
}
