// * import libs
import Container, { Service } from 'typedi';

// * import projects
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';
import { getListCategories } from '@ecommerce-frontend/src/infras/data/store/reducers/category';

/** define getAll services */
export interface GetAllCategoryService<Entity> {
    execute(): Promise<Either<CategoryModel[], AppError>>;
}

// ==============================|| GETALL CATEGORY SERVICE IMPLEMENT ||============================== //

@Service()
export class GetAllCategoryServiceImpl<Entity extends CategoryModel> implements GetAllCategoryService<Entity> {
    private categoryApi: CategoryRepository<CategoryModel>;

    // * init constructor
    constructor() {
        this.categoryApi = Container.get(CategoryApi);
    }

    /** overiding execute method */
    async execute(): Promise<Either<CategoryModel[], AppError>> {
        const res = await this.categoryApi.getAll();
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
            return failure(new AppError(res?.EM, res?.EC));
        }

        const _init = new CategoryModel();
        const result = _init.fromCategoryModelGetAll(res);

        /** save data to redux */
        dispatch(getListCategories(result));

        return success(result as CategoryModel[]);
    }
}
