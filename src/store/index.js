import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './modules/loginState'

const store = configureStore({
    reducer: {
        loginStatus: loginReducer
    }
})

export default store;