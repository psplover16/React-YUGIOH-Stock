import { createSlice } from "@reduxjs/toolkit";
import API from "@/apis/index";

function checkSameList(originalList, inspectedObjKey, inspectionStandards) {
  return originalList.find(
    (item) => item[inspectedObjKey] === inspectionStandards
  );
}

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
    setSpecifyCardType(state, action) {
      // 判斷id 與 name,找出相同
      const sameId = state.cardType.findIndex(
        (item) =>
          item.id === action.payload.id || item.name === action.payload.name
      );
      // 若沒相同則新增
      if (sameId === -1) {
        state.cardType.push(action.payload)
      } else {
        state.cardType[sameId] = action.payload
      }
    },
    setLanguageType(state, action) {
      state.languageType = action.payload;
    },
    setIdentificationType(state, action) {
      state.identificationType = action.payload;
    },
    setUserAllData(state, action) {
      state.userAllData = action.payload;
    },
  },
});

const { setCardType, setLanguageType, setIdentificationType, setUserAllData, setSpecifyCardType } =
  userProductStore.actions;

function fetchSpecifyStatus(dealData) {
  return async (dispatch, getState) => {
    // 獲取本地的 state
    const state = getState();
    const cardType = state.userProductData.cardType;
    if (checkSameList(cardType, "name", dealData.name)) return;

    const { data } = await API[dealData.APItype]({
      name: dealData.name,
      id: dealData?.id,
    });

    dispatch(setSpecifyCardType(data));
  };
}

export {
  setCardType,
  fetchSpecifyStatus,
  setLanguageType,
  setIdentificationType,
  setUserAllData,
};

const userProductReducer = userProductStore.reducer;
export default userProductReducer;
