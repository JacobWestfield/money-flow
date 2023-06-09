import { createSlice } from "@reduxjs/toolkit";
import operationService from "../../services/operation.service";
import { toast } from "react-toastify";

const initialState = {
    entities: [],
    loading: true,
    errors: []
};

const operationSlice = createSlice({
    name: "operations",
    initialState,
    reducers: {
        operationCreated(state, action) {
            state.entities.push(action.payload);
            toast.success("Операция успешно создана");
            state.loading = false;
        },
        operationDeleted(state, action) {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
            toast.success("Операция успешно удалена");
            state.loading = false;
        },
        operationUpdated(state, action) {
            const findItem = (id) => {
                return state.entities.findIndex((el) => el._id === id);
            };
            state.entities[findItem(action.payload._id)] = {
                ...action.payload
            };
            state.loading = false;
            toast.success("Операция успешно изменена");
        },
        operationRequested(state) {
            state.loading = true;
        },
        operationLoaded(state, action) {
            state.loading = false;
            if (action.payload === null) {
                state.entities = [];
            } else {
                state.entities = action.payload;
            }
        },
        operationRequestedError(state, action) {
            state.loading = false;
            state.errors = [...state.errors, action.payload];
        }
    }
});

const { reducer: operationReducer, actions: operationActions } = operationSlice;
export const {
    operationCreated,
    operationDeleted,
    operationUpdated,
    operationRequested,
    operationLoaded,
    operationRequestedError
} = operationActions;

export const loadOperations = () => async (dispatch) => {
    dispatch(operationRequested());
    try {
        const { data } = await operationService.get();
        dispatch(operationLoaded(data));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(operationRequestedError(error.message));
    }
};

export const deleteOperation = (id) => async (dispatch) => {
    dispatch(operationRequested());
    try {
        await operationService.delete(id);
        dispatch(operationDeleted(id));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(operationRequestedError(error.message));
    }
};

export const updateOperation = (data) => async (dispatch, getState) => {
    dispatch(operationRequested());
    const date = getState().operation.entities.find(
        (el) => el._id === data._id
    ).date;
    data.date = date;
    try {
        await operationService.update(data);
        dispatch(operationUpdated(data));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(operationRequestedError(error.message));
    }
};

export const createOperation = (data) => async (dispatch) => {
    dispatch(operationRequested());
    try {
        await operationService.create(data);
        dispatch(operationCreated(data));
    } catch (error) {
        toast.error("Network Error. Try later");
        dispatch(operationRequestedError(error.message));
    }
};

export default operationReducer;
