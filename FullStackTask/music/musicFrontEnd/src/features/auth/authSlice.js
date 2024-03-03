// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
