import create from 'zustand';

export const useMessage = create(
    (set) => ({
        messages: [],
        showForm: false,
        toggleForm: () => set(state => ({showForm: !state.showForm})),
        addMessage: (message) => set ((state) => ({ messages: [message,...state.messages]})),
        
    })
);

