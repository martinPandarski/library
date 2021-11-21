import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { userToken: null, loggedIn: false },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            localStorage.setItem("token", action.payload);
            state.userToken = action.payload;
            state.loggedIn = true;
        },
        logout: (state) => {
            localStorage.clear();
            state.userToken = null;
            state.loggedIn = false;
        },
        register: async (state, action) => {
            const userPayload = action.payload;
            const response = await fetch(
                `https://books-library-dev.herokuapp.com/api/user/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userPayload),
                }
            );
            if (!response.ok) {
                throw new Error("Register failed");
                // const data = await response.json();
                // localStorage.setItem("token", data.token);
                // state.userToken = data.token;
                // state.loggedIn = true;
            }
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
