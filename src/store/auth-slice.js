import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { userToken: null, loggedIn: false },
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("token", action.payload);
            state.userToken = action.payload;
            state.loggedIn = true;
        },
        logout: (state) => {
            localStorage.clear();
            state.userToken = null;
            state.loggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
