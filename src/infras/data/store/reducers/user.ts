// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { AccountModel } from '@ecommerce-frontend/src/domain/entities/Account';

// ----------------------------------------------------------------------

const initialState = {
    users: [] as AccountModel[],
    userSelect: null
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // GET USERS STYLE 1
        getListUsers(state, action) {
            state.users = action.payload;
        },

        // SELECT USER
        activeUser(state, action) {
            state.userSelect = action.payload;
        }
    }
});

// Reducer
export default user.reducer;

export const { getListUsers, activeUser } = user.actions;
