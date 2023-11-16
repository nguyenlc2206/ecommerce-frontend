// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';
import { CouponRepository } from '@ecommerce-frontend/src/domain/repository/coupon.repository';
import { CouponApi } from '@ecommerce-frontend/src/infras/data/remote/coupon.Api';
import { ProductRepository } from '@ecommerce-frontend/src/domain/repository/product.repository';
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { setDiscount } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { store } from '@ecommerce-frontend/src/infras/data/store';
import { ProductApi } from '@ecommerce-frontend/src/infras/data/remote/product.Api';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define getAll services */
export interface GetCouponByCodeService<Entity> {
    execute(code: string): Promise<Either<CouponModel, AppError>>;
}

// ==============================|| GET COUPON BY CODE SERVICE IMPLEMENT ||============================== //

export class GetCouponByCodeServiceImpl<Entity extends CouponModel> implements GetCouponByCodeService<Entity> {
    /** init api */
    protected couponApi: CouponRepository<CouponModel>;
    protected productApi: ProductRepository<ProductModel>;

    // * init constructor
    constructor() {
        this.productApi = Container.get(ProductApi);
        this.couponApi = Container.get(CouponApi);
    }

    /** overiding execute method */
    async execute(code: string): Promise<Either<CouponModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.couponApi.getByCode(code);
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

        const _init = new CouponModel();
        const result = _init.fromCouponModel(res);
        /** save data to redux */
        dispatch(setDiscount([{ code: result?.code, value: result?.discount }]));
        // update cart
        const resCart = await this.productApi.updateCart({
            status: store.getState().cart.checkout.step,
            discounts: [{ code: result?.code, value: result?.discount }]
        });
        dispatch(setLoading(false));
        return success(result as CouponModel);
    }
}
