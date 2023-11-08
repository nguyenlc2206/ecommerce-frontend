// third-party
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    checkout: {
        step: '',
        products: [],
        colors: [],
        totalQuantity: 0,
        billingAddress: null,
        payment: {
            type: 'free',
            method: 'cod',
            card: ''
        }
    }
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add product to cart
        addProduct(state, action) {
            state.checkout.products = action.payload;
            state.checkout.totalQuantity = action.payload ? action.payload.length : 0;
            const _colors: Array<string> = [];
            action.payload.map((item: ProductModel) => {
                _colors.push(item?.color);
            });
            state.checkout.colors = _colors;
        },
        // set step
        setStep(state, action) {
            state.checkout.step = action.payload;
        }
    }
});

// Reducer
export default cart.reducer;

export const { addProduct, setStep } = cart.actions;
