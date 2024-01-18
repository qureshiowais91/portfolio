// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.userId = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
