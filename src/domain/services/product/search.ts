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
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { activeProduct } from '@ecommerce-frontend/src/infras/data/store/reducers/product';
import {
    GetProductByIdService,
    GetProductByIdServiceImpl
} from '@ecommerce-frontend/src/domain/services/product/getById';
import { setMaxValues } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import { store } from '@ecommerce-frontend/src/infras/data/store';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define getAll services */
export interface SearchProductsService<Entity> {
    execute(entity: Entity): Promise<Either<ProductModel, AppError>>;
}

// ==============================|| SEARCH PRODUCTS SERVICE IMPLEMENT ||============================== //

export class SearchProductsServiceImpl<Entity extends ProductModel> implements SearchProductsService<Entity> {
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
        const params = this.handleProcessingParams(entity);
        const res = await this.productApi.query(params);
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

        // init and processing products model
        const _init = new ProductModel();
        const result = _init.fromProductModel(res);
        if (!result[0]?.products.length) {
            /** open snackbar alert */
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Product is out of stock!',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            const res = await this.getProductById.execute(entity?.id);
            return res;
        }
        // active product select
        dispatch(activeProduct(result[0]));
        dispatch(
            setMaxValues({
                ...store.getState().cart.checkout.maxValues,
                [`${result[0]?.products[0]?.id}`]: result[0]?.products[0]?.totalQty
            })
        );
        dispatch(setLoading(false));
        return success(result);
    }

    // processing param search
    private handleProcessingParams = (entity: ProductModel) => {
        let searchParams = '';
        Object.keys(entity).map((key: string) => {
            if (entity[key]) {
                if (!searchParams) searchParams = `${key}=${entity[key]}&`;
                else searchParams = searchParams + `&${key}=${entity[key]}`;
            }
        });
        return searchParams;
    };
}
