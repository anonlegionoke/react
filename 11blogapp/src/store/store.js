import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"


/* Redux store includes following key components
1. State
2. Reducers
3. Action
4. Dispatch
5. Subscriber
6. Middleware - sit between dispatching an action and it reaching the reducer

*/

/* configureStore provides default configurations and a middleware setup (like integration with dev extensions) 
to simplify certain stuff in the creation of the Redux store*/

const store = configureStore({
    reducer: {
        auth: authSlice,
    } /* Here as you can see the authSlice reducer is directly passed to the reducer field.
    this is because we are using configureStore. otherwise we would had to combine them separately
    using combineReducers */
})

export default store