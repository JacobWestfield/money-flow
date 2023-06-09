import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";
import { toast } from "react-toastify";
import isOutdated from "../../utils/isOutdated";

const initialState = {
    entities: [],
    loading: true,
    errors: [],
    lastFetch: null
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoryCreated(state, action) {
            state.entities.push(action.payload);
            toast.success("Категория успешно создана");
            state.loading = false;
        },
        categoryDeleted(state, action) {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
            toast.success("Категория успешно удалена");
            state.loading = false;
        },
        categoryUpdated(state, action) {
            const findIndex = (id) => {
                return state.entities.findIndex((el) => el._id === id);
            };
            toast.success("Категория успешно изменена");
            state.entities[findIndex(action.payload._id)] = {
                ...action.payload
            };
            state.loading = false;
        },
        categoryRequested(state) {
            state.loading = true;
        },
        categoryLoaded(state, action) {
            state.loading = false;
            state.lastFetch = Date.now();
            if (action.payload === null) {
                state.entities = [];
            } else {
                state.entities = action.payload;
            }
        },
        categoryRequestedError(state, action) {
            state.loading = false;
            state.errors = [...state.errors, action.payload];
        }
    }
});

const { reducer: categoryReducer, actions: categoryActions } = categorySlice;
export const {
    categoryCreated,
    categoryDeleted,
    categoryUpdated,
    categoryRequested,
    categoryLoaded,
    categoryRequestedError
} = categoryActions;

export const loadCategories = () => async (dispatch, getState) => {
    const { lastFetch } = getState().category;
    if (isOutdated(lastFetch)) {
        dispatch(categoryRequested());
        try {
            const { data } = await categoryService.get();
            dispatch(categoryLoaded(data));
        } catch (error) {
            toast.error("Network Error. Try later");
            dispatch(categoryRequestedError(error.message));
        }
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch(categoryRequested());
    try {
        await categoryService.delete(id);
        dispatch(categoryDeleted(id));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(categoryRequestedError(error.message));
    }
};

export const updateCategory = (data) => async (dispatch) => {
    dispatch(categoryRequested());
    try {
        await categoryService.update(data);
        dispatch(categoryUpdated(data));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(categoryRequestedError(error.message));
    }
};

export const createCategory = (data) => async (dispatch) => {
    dispatch(categoryRequested());
    try {
        await categoryService.create(data);
        dispatch(categoryCreated(data));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(categoryRequestedError(error.message));
    }
};

export default categoryReducer;
