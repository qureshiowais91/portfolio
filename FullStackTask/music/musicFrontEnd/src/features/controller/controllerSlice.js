// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genreID: []
}; 

const controllerSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setSong: (state, action) => {
            state.url = action.payload.url;
            state.name = action.payload.name;
            state.album = action.payload.album;
        },
        setGenre: (state, action) => {
            console.log(action.payload.genreID)
            state.genreID.push(action.payload.genreID);
        }
    },
});

export const { setSong, setGenre } = controllerSlice.actions;
export default controllerSlice.reducer;
