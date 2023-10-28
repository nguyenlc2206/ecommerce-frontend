// third-party
import { createSlice } from '@reduxjs/toolkit';

// import projects
import { CategoryModel } from '@ecommerce-frontend/src/domain/entities/Category';

// ----------------------------------------------------------------------

const initialState = {
    categories: [] as CategoryModel[],
    categorySelect: {} as CategoryModel
};

const category = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // GET CATEGORIES
        getListCategories(state, action) {
            state.categories = action.payload;
        },

        // SELECT CATEGORY
        activeCategory(state, action) {
            state.categorySelect = action.payload;
        }
    }
});

// Reducer
export default category.reducer;

export const { getListCategories, activeCategory } = category.actions;
