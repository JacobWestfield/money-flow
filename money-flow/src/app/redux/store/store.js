import { configureStore } from "@reduxjs/toolkit";
import billReducer from "../reducers/billsReducer";
import categoryReducer from "../reducers/categoriesReducer";
import operationReducer from "../reducers/operationsReducer";

export const store = configureStore({
    reducer: {
        bill: billReducer,
        category: categoryReducer,
        operation: operationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production"
});
