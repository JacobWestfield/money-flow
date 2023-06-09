import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import authService from "../../services/authService";
import localStorageService from "../../services/localStorage.service";
import { toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: [],
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: [],
          isLoading: false,
          error: null,
          auth: {},
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
            console.log(action.payload);
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = null;
        },
        userUpdated: (state, action) => {
            const user = state.entities.find(
                (el) => el._id === action.payload._id
            );
            const userIndex = state.entities.findIndex(
                (el) => el._id === action.payload._id
            );
            state.entities[userIndex] = user;
            state.isLoading = false;
            toast.success("Данные успешно изменены");
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated
} = actions;

export const updateUserData = (user) => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const data = await userService.update(user);
        dispatch(userUpdated(data));
    } catch (error) {
        dispatch(authRequestFailed());
    }
};

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const login =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.userId }));
            localStorageService.setTokens(data);
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const signUp =
    ({ email, password, name, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password, name });
            console.log(data);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    name,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const data = await userService.get();
        dispatch(usersReceived(data));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.user.entities;
export const getCurrentUserData = () => (state) => {
    return state.user.entities.length && state.user.auth
        ? state.user.entities.find((u) => u._id === state.user.auth.userId)
        : {};
};
export const getUserById = (userId) => (state) => {
    if (state.user.entities.length) {
        return state.user.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.user.isLoading;
export const getCurrentUserId = () => (state) => state.user.auth.userId;

export default usersReducer;
