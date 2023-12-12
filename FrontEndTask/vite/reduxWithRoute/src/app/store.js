
import { configureStore } from '@reduxjs/toolkit'
import quantityChange from '../features/quantityChange'

const store = configureStore({ reducer: quantityChange })

export default store