// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';
import { CouponApi } from '@ecommerce-frontend/src/infras/data/remote/coupon.Api';
import { CouponRepository } from '@ecommerce-frontend/src/domain/repository/coupon.repository';
import { GetAllCouponService, GetAllCouponServiceImpl } from '@ecommerce-frontend/src/domain/services/coupon/getAll';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define updateProfile services */
export interface DeleteCouponService<Entity> {
    execute(id: string): Promise<Either<string, AppError>>;
}

// ==============================|| DELETE SERVICE IMPLEMENT ||============================== //

export class DeleteCouponServiceImpl<Entity extends CouponModel> implements DeleteCouponService<Entity> {
    /** init api */
    private couponApi: CouponRepository<CouponModel>;
    /** init service */
    private getAllService: GetAllCouponService<CouponModel>;

    // * init constructor
    constructor() {
        this.couponApi = Container.get(CouponApi);
        this.getAllService = Container.get(GetAllCouponServiceImpl);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<string, AppError>> {
        dispatch(setLoading(true));
        const res = await this.couponApi.delete(id);
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

        /** open snackbar alert */
        dispatch(
            openSnackbar({
                open: true,
                message: res?.MS,
                variant: 'alert',
                alert: { color: 'success' },
                close: false
            })
        );
        /** get all account */
        const _res = await this.getAllService.execute();
        return success('okie');
    }
}
