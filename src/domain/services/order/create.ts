// * import libs
import Container, { Service } from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { OrderRepository } from '@ecommerce-frontend/src/domain/repository/order.repository';
import { OrderApi } from '@ecommerce-frontend/src/infras/data/remote/order.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';
import { setOrderComplete } from '@ecommerce-frontend/src/infras/data/store/reducers/cart';
import { setOrder, setURLCardPayemnt } from '@ecommerce-frontend/src/infras/data/store/reducers/order';

/** define auth services */
export interface CreateOrderService<Entity> {
    execute(entity: Entity): Promise<Either<OrderModel, AppError>>;
}

// ==============================|| CREATE ORDER IMPLEMENT ||============================== //

@Service()
export class CreateOrderServiceImpl<Entity extends OrderModel> implements CreateOrderService<Entity> {
    /** init api */
    protected orderApi: OrderRepository<OrderModel>;

    // * init constructor
    constructor() {
        this.orderApi = Container.get(OrderApi);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<OrderModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.orderApi.create(entity);
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
            dispatch(setOrderComplete({ id: '', status: false }));
            return failure(new AppError(res?.EM, res?.EC));
        }
        // process response data
        const _init = new OrderModel();
        const result = _init.fromOrderModel(res);

        // alert get api success
        dispatch(
            openSnackbar({
                open: true,
                message: res?.MS,
                variant: 'alert',
                alert: { color: 'success' },
                close: false
            })
        );
        dispatch(setLoading(false));
        dispatch(setOrder(result));
        dispatch(setURLCardPayemnt(result?.url));
        dispatch(setOrderComplete({ id: result?.orderNumber, status: true }));
        return success(result);
    }
}
