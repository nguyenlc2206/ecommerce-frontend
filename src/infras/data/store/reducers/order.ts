// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';

// ----------------------------------------------------------------------

const initialState = {
    orderSelect: {} as OrderModel,
    orders: [] as OrderModel[],
    urlCardPayment: '',
    displayType: 'orderMe'
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setListOrders(state, action) {
            state.orders = action.payload;
        },
        activeOrder(state, action) {
            state.orderSelect = action.payload;
        },
        // set card url payment
        setURLCardPayemnt(state, action) {
            if (action.payload) window.open(action.payload, '_blank', 'noreferrer');
            state.urlCardPayment = action.payload;
        },
        setDisplayType(state, action) {
            state.displayType = action.payload;
        }
    }
});

// Reducer
export default order.reducer;

export const { activeOrder, setURLCardPayemnt, setListOrders, setDisplayType } = order.actions;
