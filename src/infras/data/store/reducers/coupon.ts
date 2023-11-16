// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { CouponModel } from '@ecommerce-frontend/src/domain/entities/Coupon';
// ----------------------------------------------------------------------

const initialState = {
    coupons: [] as CouponModel[]
};

const coupon = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        // GET COUPONS
        getListCoupns(state, action) {
            state.coupons = action.payload;
        }
    }
});

// Reducer
export default coupon.reducer;

export const { getListCoupns } = coupon.actions;
