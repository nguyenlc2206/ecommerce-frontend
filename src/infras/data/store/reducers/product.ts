// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
// ----------------------------------------------------------------------

const initialState = {
    products: [] as ProductModel[],
    productSelect: null,
    productSizes: [] as ProductModel[],
    productSort: [] as ProductModel[]
};

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // GET PRODUCT
        getListProducts(state, action) {
            state.products = action.payload;
        },
        getListProductSizes(state, action) {
            state.productSizes = action.payload;
        },
        getListProductSort(state, action) {
            state.productSort = action.payload;
        },
        // SELECT PRODUCT
        activeProduct(state, action) {
            state.productSelect = action.payload;
        }
    }
});

// Reducer
export default product.reducer;

export const { getListProducts, activeProduct, getListProductSizes, getListProductSort } = product.actions;
