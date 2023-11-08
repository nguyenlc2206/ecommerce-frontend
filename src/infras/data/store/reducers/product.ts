// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
// ----------------------------------------------------------------------

const initialState = {
    products: [] as ProductModel[],
    productSelect: {} as ProductModel,
    productSizes: [] as ProductModel[],
    options: { colors: [] as Array<{ id: string; value: string }>, sizes: [] as Array<string> }
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

        // SELECT PRODUCT
        activeProduct(state, action) {
            state.productSelect = action.payload;

            const _colors: Array<{ id: string; value: string }> = [];
            action.payload?.products.map((item: ProductModel) => {
                _colors.push({ id: item?.id, value: item?.color });
            });

            state.options = { ...state.options, colors: _colors };
        }
    }
});

// Reducer
export default product.reducer;

export const { getListProducts, activeProduct, getListProductSizes } = product.actions;
