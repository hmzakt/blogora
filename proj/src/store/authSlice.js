import { createSlice } from "@reduxjs/toolkit";

// Safe function to parse JSON and avoid errors
const loadUserData = () => {
    try {
        const storedData = localStorage.getItem("userData");
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        return null;
    }
};

const initialState = {
    status: localStorage.getItem("authStatus") === "true",
    userData: loadUserData(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;

            // Save to localStorage
            localStorage.setItem("authStatus", "true");
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;

            // Remove from localStorage
            localStorage.removeItem("authStatus");
            localStorage.removeItem("userData");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
