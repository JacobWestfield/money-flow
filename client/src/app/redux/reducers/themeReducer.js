import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    style: "dark"
};

const themeSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        themeToggled(state) {
            if (state.style === "dark") {
                state.style = "light";
            } else {
                state.style = "dark";
            }
        }
    }
});

const { reducer: themeReducer, actions } = themeSlice;
const { themeToggled } = actions;

export const toggleTheme = () => (dispatch) => {
    dispatch(themeToggled());
};

export default themeReducer;
