// third-party
import { ProductModel } from '@ecommerce-frontend/src/domain/entities/Product';
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    checkout: {
        step: '',
        products: [],
        totalQuantity: 0,
        maxValues: {},
        discounts: [],
        billingAddress: null,
        orderComplete: {
            id: '',
            status: false,
            orderNumber: ''
        },
        paymentCharged: {
            type: 'free',
            method: 'card'
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
            state.checkout.discounts = [];
            state.checkout.billingAddress = null;
            state.checkout.totalQuantity = action.payload ? action.payload.length : 0;
        },
        // set step
        setStep(state, action) {
            state.checkout.step = action.payload;
        },
        // set maxvalue
        setMaxValues(state, action) {
            state.checkout.maxValues = action.payload;
        },
        // set discount
        setDiscount(state, action) {
            state.checkout.discounts = action.payload;
        },
        // set billing Address
        setBillingAddress(state, action) {
            state.checkout.billingAddress = action.payload;
        },
        // set payment
        setPayment(state, action) {
            state.checkout.paymentCharged = {
                ...state.checkout.paymentCharged,
                type: action.payload.type ? action.payload.type : state.checkout.paymentCharged.type,
                method: action.payload.method ? action.payload.method : state.checkout.paymentCharged.method
            };
        },
        // set order complete
        setOrderComplete(state, action) {
            state.checkout.orderComplete = {
                ...state.checkout.orderComplete,
                id: action.payload.id,
                status: action.payload.status
            };
        }
    }
});

// Reducer
export default cart.reducer;

export const { addProduct, setStep, setMaxValues, setDiscount, setBillingAddress, setPayment, setOrderComplete } =
    cart.actions;
