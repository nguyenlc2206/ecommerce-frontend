import Container from 'typedi';

import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import { AuthRepository } from '@ecommerce-frontend/src/domain/repository/auth.repository';
import { AuthApi } from '@ecommerce-frontend/src/infras/data/remote/authApi';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { REGISTER } from '@ecommerce-frontend/src/infras/data/store/actions/account';
import { CouponModel } from '../../entities/Coupon';
import { CouponRepository } from '../../repository/coupon.repository';
import { CouponApi } from '@ecommerce-frontend/src/infras/data/remote/coupon.Api';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { GetAllCouponService, GetAllCouponServiceImpl } from './getAll';

/** define services */
export interface CreateCouponService<Entity> {
    execute(entity: Entity): Promise<Either<CouponModel, AppError>>;
}

// ==============================|| CREATE COUPON SERVICE IMPLEMENT ||============================== //

export class CreateCouponServiceImpl<Entity extends CouponModel> implements CreateCouponService<Entity> {
    // init service
    private couponApi: CouponRepository<CouponModel>;
    private getAllService: GetAllCouponService<CouponModel>;
    // * init constructor
    constructor() {
        this.couponApi = Container.get(CouponApi);
        this.getAllService = Container.get(GetAllCouponServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<CouponModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.couponApi.create(entity);
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
        const _init = new CouponModel();
        const result = _init.fromCouponModel(res);

        const _res = await this.getAllService.execute();
        dispatch(setLoading(false));

        return success(result);
    }
}
