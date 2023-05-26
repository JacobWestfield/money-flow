import { createSlice } from "@reduxjs/toolkit";
import billService from "../../services/billService";
import { toast } from "react-toastify";
import isOutdated from "../../utils/isOutdated";

const initialState = {
    entities: [],
    loading: true,
    errors: [],
    lastFetch: null
};

const billSlice = createSlice({
    name: "bills",
    initialState,
    reducers: {
        createdBill(state, action) {
            state.entities.push(action.payload);
            toast("Счет успешно создан");
            state.loading = false;
        },
        deletedBill(state, action) {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
            toast("Счет успешно удален");
            state.loading = false;
        },
        updatedBill(state, action) {
            const findIndex = (id) => {
                return state.entities.findIndex((el) => el._id === id);
            };
            toast("Счет успешно изменен");
            state.entities[findIndex(action.payload._id)] = {
                ...action.payload
            };
            state.loading = false;
        },
        requestedBill(state) {
            state.loading = true;
        },
        loadedBill(state, action) {
            state.loading = false;
            state.lastFetch = Date.now();
            if (action.payload === null) {
                state.entities = [];
            } else {
                state.entities = action.payload;
            }
        },
        loadedBillError(state, action) {
            toast("Network Error. Try later");
            console.log(action.payload);
            state.loading = false;
            state.errors = [...state.errors, action.payload];
        }
    }
});

const { reducer: billReducer, actions: billActions } = billSlice;
export const {
    createdBill,
    deletedBill,
    updatedBill,
    requestedBill,
    loadedBill,
    loadedBillError
} = billActions;

export const loadBills = () => async (dispatch, getState) => {
    const { lastFetch } = getState().bill;
    if (isOutdated(lastFetch)) {
        dispatch(requestedBill());
        try {
            const { content } = await billService.get();
            dispatch(loadedBill(content));
        } catch (error) {
            dispatch(loadedBillError(error.message));
        }
    }
};

export const deleteBill = (id) => async (dispatch) => {
    dispatch(requestedBill());
    try {
        await billService.delete(id);
        dispatch(deletedBill(id));
    } catch (error) {
        dispatch(loadedBillError(error.message));
    }
};

export const updateBill = (data) => async (dispatch) => {
    dispatch(requestedBill());
    try {
        await billService.update(data);
        dispatch(updatedBill(data));
    } catch (error) {
        dispatch(loadedBillError(error.message));
    }
};

export const createBill = (data) => async (dispatch) => {
    dispatch(requestedBill());
    try {
        await billService.create(data);
        dispatch(createdBill(data));
    } catch (error) {
        dispatch(loadedBillError(error.message));
    }
};

export default billReducer;
