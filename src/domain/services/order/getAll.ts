// * import libs
import Container, { Service } from 'typedi';

// * import projects
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { OrderRepository } from '@ecommerce-frontend/src/domain/repository/order.repository';
import { OrderApi } from '@ecommerce-frontend/src/infras/data/remote/order.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { setListOrders } from '@ecommerce-frontend/src/infras/data/store/reducers/order';

/** define getAll services */
export interface GetAllOrderService<Entity> {
    execute(): Promise<Either<OrderModel[], AppError>>;
}

// ==============================|| GETALL ORDER SERVICE IMPLEMENT ||============================== //

@Service()
export class GetAllOrderServiceImpl<Entity extends OrderModel> implements GetAllOrderService<Entity> {
    private orderApi: OrderRepository<OrderModel>;

    // * init constructor
    constructor() {
        this.orderApi = Container.get(OrderApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<OrderModel[], AppError>> {
        dispatch(setLoading(true));
        const res = await this.orderApi.getAll();
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

        const _init = new OrderModel();
        const result = _init.fromOrderModel(res);
        // console.log('>>>Check result:', result);
        /** save data to redux */
        dispatch(setListOrders(result));
        dispatch(setLoading(false));
        return success(result as OrderModel[]);
    }
}
