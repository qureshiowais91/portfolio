import { createSlice } from '@reduxjs/toolkit'

const initialState = { Quantity: 0 }

const quantityChange = createSlice({
    name: 'QuantityChange',
    initialState,
    reducers: {
        incrementDecrementByAmount(state, actions) {
            state.Quantity = actions.payload;
        }
    },
})

export const { incrementDecrementByAmount } = quantityChange.actions
export default quantityChange.reducer