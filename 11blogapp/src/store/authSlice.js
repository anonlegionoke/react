/* Reducers go in here.

Reducers are nothing but the functions which used to update the state based on other actions

We use createSlice from Redux toolkit to generate these functions(reducers) for a 
given 'slice' of state.*/


import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer