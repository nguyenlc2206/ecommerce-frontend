// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { OrderModel } from '@ecommerce-frontend/src/domain/entities/Order';

// ----------------------------------------------------------------------

const initialState = {
    order: {} as OrderModel
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder(state, action) {
            state.order = action.payload;
        }
    }
});

// Reducer
export default order.reducer;

export const { setOrder } = order.actions;
