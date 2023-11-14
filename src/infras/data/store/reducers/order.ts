// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';

// ----------------------------------------------------------------------

const initialState = {
    order: {} as OrderModel,
    urlCardPayment: ''
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action) {
            state.order = action.payload;
        },
        // set card url payment
        setURLCardPayemnt(state, action) {
            window.open(action.payload, '_blank', 'noreferrer');
            state.urlCardPayment = action.payload;
        }
    }
});

// Reducer
export default order.reducer;

export const { setOrder, setURLCardPayemnt } = order.actions;
