import { configureStore } from "@reduxjs/toolkit";
import userProductReducer from './modules/userProductStore'

const store = configureStore({
    reducer: {
        userProductData: userProductReducer
    }
})

export default store;