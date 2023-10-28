// * import libs
import Container, { Service } from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';

// * import redux
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import {
    GetAllCategoryService,
    GetAllCategoryServiceImpl
} from '@ecommerce-frontend/src/domain/services/categories/getAll';

/** define auth services */
export interface CreateCategoryService<Entity> {
    execute(entity: Entity): Promise<Either<CategoryModel, AppError>>;
}

// ==============================|| CREATE CATEGORY IMPLEMENT ||============================== //

@Service()
export class CreateCategoryServiceImpl<Entity extends CategoryModel> implements CreateCategoryService<Entity> {
    private categoryApi: CategoryRepository<CategoryModel>;
    private getAllCategories: GetAllCategoryService<CategoryModel>;

    // * init constructor
    constructor() {
        this.categoryApi = Container.get(CategoryApi);
        this.getAllCategories = Container.get(GetAllCategoryServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<CategoryModel, AppError>> {
        const res = await this.categoryApi.create(entity);
        if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC));

        const _init = new CategoryModel();
        const result = _init.fromCategoryModel(res);

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

        this.getAllCategories.execute();

        return success(result);
    }
}
