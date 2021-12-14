import create from 'zustand';

// Messages state =================================================================================================
export const useMessage = create(
    (set) => ({
        messages: [],
        showForm: false,
        toggleForm: () => set(state => ({showForm: !state.showForm})),
        addMessage: (message) => set ((state) => ({ messages: [message,...state.messages]})),
        
    })
);

// Auth state=====================================================================================================

export const useAuth = create(
    set => ({ 
        loggedUser: null,
        loginUser: (user) => set(state => ({ loggedUser: user})),
        logoutUser: () => set(state => ({ loggedUser: null})),
    })
)