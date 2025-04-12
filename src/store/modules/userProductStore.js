import { createSlice } from "@reduxjs/toolkit";

const userProductStore = createSlice({
    name: "userProductData",
    initialState: {
        cardType: [],
        languageType: [],
        identificationType: [],
        userAllData: {},
    },
    reducers: {
        setCardType(state, action) {
            state.cardType = action.payload;
        },
        setLanguageType(state, action) {
            state.languageType = action.payload;
        },
        setIdentificationType(state, action) {
            state.identificationType = action.payload;
        },
        setUserAllData(state, action) {
            state.userAllData = action.payload;
        }
    }
})

const { setCardType, setLanguageType, setIdentificationType, setUserAllData } = userProductStore.actions;
export { setCardType, setLanguageType, setIdentificationType, setUserAllData };

const userProductReducer = userProductStore.reducer;
export default userProductReducer;