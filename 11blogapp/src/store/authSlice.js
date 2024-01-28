import { createSlice } from "@reduxjs/toolkit"

/* Reducers go in here.

Reducers are nothing but the functions which is used to update the state based on other actions.

We use createSlice from Redux toolkit to generate these functions(reducers) for a 
given 'slice' of state. 

As your components grow in complexity, 
it can get harder to see at a glance all the different ways in which a component’s state gets updated.
So we CONSOLIDATE state logic with reducers.
*/

/* WHAT IS THE ACTUAL NEED OF REDUX IN REACT? 

the state of an entire application can be managed from a centralized store with Redux.
Basically it is used to update the state.
*/

/* Here we are using Redux to login and logout the user */

const initialState = {
    status: false, /* not logged in */
    userData: null /* no data available since not logged in */
}

/* Remember 3 things when working with Redux
1.action - action.payload
2.reducers - how the state changes in response to actions
3.store

createSlice() combines these 3
which must have the following structure

name
initialState
reducers - here goes the action to perform
*/

const authSlice = createSlice({
    name: "auth",
    initialState,                                               
    reducers: {
        login: (state, action) => {
            state.status = true; 
            state.userData = action.payload.userData /* retrieve user data */
        },
        logout: (state) => { /* here no need of 'action', since to logout, no need to fetch the user data */
            state.status = false;
            state.userData = null;
            
        }
    }
})

export const {login, logout} = authSlice.actions /* exporting the operations as actions */

export default authSlice.reducer /* exporting the whole setup as a reducer */