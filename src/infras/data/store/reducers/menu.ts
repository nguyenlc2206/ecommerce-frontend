// types
import { MenuProps } from '@ecommerce-frontend/src/common/types/menu';
import { createSlice } from '@reduxjs/toolkit';

// project imports

// initial state
const initialState: MenuProps = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: true,
    error: null
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        activeID(state, action) {
            state.selectedID = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;
