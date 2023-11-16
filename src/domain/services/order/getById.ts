// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';
import { OrderRepository } from '@ecommerce-frontend/src/domain/repository/order.repository';
import { OrderApi } from '@ecommerce-frontend/src/infras/data/remote/order.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { activeOrder } from '@ecommerce-frontend/src/infras/data/store/reducers/order';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define getAll services */
export interface GetOrderByIdService<Entity> {
    execute(id: string): Promise<Either<OrderModel, AppError>>;
}

// ==============================|| GET ORDER BY ID SERVICE IMPLEMENT ||============================== //

export class GetOrderByIdServiceImpl<Entity extends OrderModel> implements GetOrderByIdService<Entity> {
    /** init api */
    private orderApi: OrderRepository<OrderModel>;

    // * init constructor
    constructor() {
        this.orderApi = Container.get(OrderApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<OrderModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.orderApi.getById(id);
        if (res?.EC !== 200) {
            dispatch(setLoading(false));
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new OrderModel();
        const result = _init.fromOrderModel(res);

        /** save data to redux */
        dispatch(activeOrder(result));
        dispatch(setLoading(false));
        return success(result as OrderModel);
    }
}
