import { configureStore } from "@reduxjs/toolkit";
import billReducer from "../reducers/billsReducer";
import categoryReducer from "../reducers/categoriesReducer";
import operationReducer from "../reducers/operationsReducer";
import usersReducer from "../reducers/userReducer";

export const store = configureStore({
    reducer: {
        bill: billReducer,
        category: categoryReducer,
        operation: operationReducer,
        user: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production"
});
