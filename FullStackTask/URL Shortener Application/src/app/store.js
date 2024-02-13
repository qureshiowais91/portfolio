import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Create a store using the create function
const authStore = create(
  // Apply devtools and persist middleware
  persist(devtools((set) => ({
    user: [],
    login: (data) => set({isAuthenticated: true, user: data["userLoggedInEvent"]["eventData"] }),//set jwt in browser
  })), {
    name: 'authStore', // Name for the persisted store
    whitelist: ['user'], // Specify which state properties to persist
  })
);

const profileStore =  create((set)=>{

});


// Export the created store
export default authStore;
