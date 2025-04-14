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
    //     async setSpecifyCardType(state, action) {
    //       //   action.payload = {
    //       //     APItype: "打哪個API",
    //       //     name: "",
    //       //     id: "",
    //       //   };
    // console.log(action.payload.name)
    //       // 檢查 name，若沒有重複，則打API
    //     //   if (checkSameList(state.cardType, "name", action.payload.name)) return;

    //     //   const { data } = await API[action.payload.APItype]({
    //     //     name: action.payload.name,
    //     //   });
    //     //   console.log(data);

    //       // 判斷id,相同的取代
    //       //   const sameId = state.cardType.findIndex(
    //       //     (item) =>
    //       //       item.id === action.payload.id || item.name === action.payload.name
    //       //   );
    //       //   console.log(sameId);
    //       //   若
    //       //   if (sameId.length === state.cardType.length) console.log(sameId);
    //       //   state.cardType = sameId;
    //     },
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

const { setCardType, setLanguageType, setIdentificationType, setUserAllData } =
  userProductStore.actions;

function setSpecifyCardType(url) {
  return async (dispatch) => {
    // const { data } = await axios.get(url);
    // console.log(data)
    console.log(userProductStore)
    console.log(userProductStore.getSelectors().cardType
    );

    // //
    // dispatch(setCardType(data));
  };
}

export {
  setCardType,
  setSpecifyCardType,
  setLanguageType,
  setIdentificationType,
  setUserAllData,
};

const userProductReducer = userProductStore.reducer;
export default userProductReducer;
