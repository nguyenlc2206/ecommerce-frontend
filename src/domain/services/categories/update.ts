// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';
import {
    GetAllCategoryService,
    GetAllCategoryServiceImpl
} from '@ecommerce-frontend/src/domain/services/categories/getAll';
import { setLoading } from '@ecommerce-frontend/src/infras/data/store/reducers/page';

/** define UpdateCategoryService services */
export interface UpdateCategoryService<Entity> {
    execute(entity: Entity): Promise<Either<CategoryModel, AppError>>;
}

// ==============================|| UPDATE CATEGORY SERVICE IMPLEMENT ||============================== //

export class UpdateCategoryServiceImpl<Entity extends AccountModel> implements UpdateCategoryService<Entity> {
    // init repo
    private categoryApi: CategoryRepository<CategoryModel>;
    /** init services */
    private getAllCategoryService: GetAllCategoryService<CategoryModel>;
    // * init constructor
    constructor() {
        this.categoryApi = Container.get(CategoryApi);
        this.getAllCategoryService = Container.get(GetAllCategoryServiceImpl);
    }

    /** overiding execute method */
    async execute(entity: Entity): Promise<Either<CategoryModel, AppError>> {
        dispatch(setLoading(true));
        const res = await this.categoryApi.update(entity);
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
        // refresh list category
        const _res = await this.getAllCategoryService.execute();
        return success(result as AccountModel);
    }
}
