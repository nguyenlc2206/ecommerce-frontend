// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects

// ----------------------------------------------------------------------

const initialState = {
    pageLoading: false
};

const page = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.pageLoading = action.payload;
        }
    }
});

// Reducer
export default page.reducer;

export const { setLoading } = page.actions;
