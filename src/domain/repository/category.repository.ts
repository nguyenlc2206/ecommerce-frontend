import { AxiosResponseCustom } from '@ecommerce-frontend/src/common/types';

/** define category repository */
export interface CategoryRepository<T> {
    getAll(): Promise<AxiosResponseCustom>;
    getById(id: string): Promise<AxiosResponseCustom>;
    create(entity: T): Promise<AxiosResponseCustom>;
    delete(id: string): Promise<AxiosResponseCustom>;
    update(entity: T): Promise<AxiosResponseCustom>;
    activeCategory(id: string): Promise<AxiosResponseCustom>;
}
