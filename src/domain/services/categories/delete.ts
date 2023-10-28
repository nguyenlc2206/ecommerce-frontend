// * import libs
import Container from 'typedi';

// * import projects
import { Either, failure, success } from '@ecommerce-frontend/src/common/functions/Either';
import AppError from '@ecommerce-frontend/src/common/functions/AppError';
import { CategoryRepository } from '@ecommerce-frontend/src/domain/repository/category.repository';
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';
import { CategoryApi } from '@ecommerce-frontend/src/infras/data/remote/category.Api';
import {
    GetAllCategoryService,
    GetAllCategoryServiceImpl
} from '@ecommerce-frontend/src/domain/services/categories/getAll';

// import redux
import { dispatch } from '@ecommerce-frontend/src/infras/data/store';
import { openSnackbar } from '@ecommerce-frontend/src/infras/data/store/reducers/snackbar';

/** define updateProfile services */
export interface DeleteService<Entity> {
    execute(id: string): Promise<Either<string, AppError>>;
}

// ==============================|| DELETE SERVICE IMPLEMENT ||============================== //

export class DeleteCategoryServiceImpl<Entity extends CategoryModel> implements DeleteService<Entity> {
    /** init api */
    private categoryApi: CategoryRepository<CategoryModel>;
    /** init service */
    private getAllService: GetAllCategoryService<CategoryModel>;

    // * init constructor
    constructor() {
        this.categoryApi = Container.get(CategoryApi);
        this.getAllService = Container.get(GetAllCategoryServiceImpl);
    }

    /** overiding execute method */
    async execute(id: string): Promise<Either<string, AppError>> {
        const res = await this.categoryApi.delete(id);
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
        this.getAllService.execute();

        return success('okie');
    }
}
