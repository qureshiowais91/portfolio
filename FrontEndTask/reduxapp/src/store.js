import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; 

// Define your initial state
const initialState = {
  cart: [
    {
      id: 1,
      title: "iPhone 9",
      // ... other product properties
    },
    // ... other products
  ],
};

// Create a reducer function to handle actions and update the state
const rootReducer = (state = initialState, action) => {
  // Handle actions here...
  return state; // Return the updated state
};

// Create the Redux store with the reducer and initial state
const store = createStore(rootReducer);
