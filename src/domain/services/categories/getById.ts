// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { activeCategory } from '@ecommerce-frontend/src/infras/data/store/reducers/category';

/** define getAll services */
export interface GetCategoryByIdService<Entity> {
    execute(id: string): Promise<Either<CategoryModel, AppError>>;
}

// ==============================|| GET ACCOUNT BY ID SERVICE IMPLEMENT ||============================== //

export class GetCategoryByIdServiceImpl<Entity extends CategoryModel> implements GetCategoryByIdService<Entity> {
    /** init api */
    private categoryApi: CategoryRepository<CategoryModel>;

    // * init constructor
    constructor() {
        this.categoryApi = Container.get(CategoryApi);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<CategoryModel, AppError>> {
        const res = await this.categoryApi.getById(id);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new CategoryModel();
        const result = _init.fromCategoryModelGetAll(res);

        /** save data to redux */
        dispatch(activeCategory(result));

        return success(result as CategoryModel);
    }
}
