// * import libs
import Container, { Service } from 'typedi';

// * import projects
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { CouponRepository } from '@ecommerce-frontend/src/domain/repository/coupon.repository';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';
import { CouponApi } from '@ecommerce-frontend/src/infras/data/remote/coupon.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { getListCoupns } from '@ecommerce-frontend/src/infras/data/store/reducers/coupon';

/** define getAll services */
export interface GetAllCouponService<Entity> {
    execute(): Promise<Either<CouponModel[], AppError>>;
}

// ==============================|| GETALL COUPON SERVICE IMPLEMENT ||============================== //

@Service()
export class GetAllCouponServiceImpl<Entity extends CouponModel> implements GetAllCouponService<Entity> {
    protected couponApi: CouponRepository<CouponModel>;

    // * init constructor
    constructor() {
        this.couponApi = Container.get(CouponApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<CouponModel[], AppError>> {
        dispatch(setLoading(true));
        const res = await this.couponApi.getAll();
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

        const _init = new CouponModel();
        const result = _init.fromCouponModel(res);

        /** save data to redux */
        dispatch(getListCoupns(result));
        dispatch(setLoading(false));
        return success(result as CouponModel[]);
    }
}
