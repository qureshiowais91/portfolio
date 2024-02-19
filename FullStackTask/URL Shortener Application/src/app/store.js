import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Create a store using the create function
export const authStore = create(
  // Apply devtools and persist middleware
  persist(devtools((set) => ({
    user: [],
    login: (data) => set({ isAuthenticated: true, user: data["userLoggedInEvent"]["eventData"] }),//set jwt in browser
  })), {
    name: 'authStore', // Name for the persisted store
    whitelist: ['user'], // Specify which state properties to persist
  })
);

export const urlStore = create(
  // Apply devtools and persist middleware
  persist(devtools((set) => ({
    url: [],
    setUrl: (data)=> set({url:data})
  })), {
    name: 'urlStore', // Name for the persisted store
    whitelist: ['url'], // Specify which state properties to persist
  })
);
