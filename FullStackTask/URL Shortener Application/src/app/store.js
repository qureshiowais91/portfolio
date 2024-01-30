import { create } from 'zustand';

// Create a store using the create function
const useStore = create((set) => ({
    count: 0,
    login: () => set((state) => ({ user: state.user })),
}));

// Export the created store
export default useStore;
