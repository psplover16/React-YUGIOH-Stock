import { createSlice } from "@reduxjs/toolkit";

const loginStore = createSlice({
    name: "loginStatus",
    initialState: {
        account: "",
        password: "",
        id: ""
    },
    reducers: {
        setLoginStatus(state, action) {
            console.log(action)
            state.account = action.payload.account;
            state.password = action.payload.password;
            state.id = action.payload.id;
        }
    }
})

const { setLoginStatus } = loginStore.actions;
export { setLoginStatus };

const loginReducer = loginStore.reducer;
export default loginReducer;