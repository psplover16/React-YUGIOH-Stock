import { createSlice } from "@reduxjs/toolkit";
import API from "@/apis/index";
import API_STORE_DATA_STRUCT from '@/constants/dataStruct';

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
    setTargetStoreData(state, action = { type: '', value: '' }) {
      state[API_STORE_DATA_STRUCT[action.payload.type].storeDataName] = action.payload.value;
    },
    addOrEditTargetStoreData(state, action = { type: '', value: '' }) {
      // 判斷id 與 name,找出相同
      const sameId = state[action.payload.type].findIndex(
        (item) =>
          item.id === action.payload.value.id || item.name === action.payload.value.name
      );
      // 若沒相同則新增
      if (sameId === -1) {
        state[action.payload.type].push(action.payload.value)
      } else {
        state[action.payload.type][sameId] = action.payload.value
      }
    }
  },
});

const { setTargetStoreData, addOrEditTargetStoreData } =
  userProductStore.actions;

function fetchSpecifyStatus(dealData = {
  type: '要對哪個資料做編輯或新增',
  operate: 'add || edit',
  name: '輸入要新增或編輯的名稱',
  id: '輸入要編輯的id',
}) {
  // 輸入參數參考 API_STORE_DATA_STRUCT
  return async (dispatch, getState) => {
    // 獲取本地的 state
    const state = getState();
    const operateStoreDataName = API_STORE_DATA_STRUCT[dealData.type].storeDataName
    const operateStoreData = state.userProductData[operateStoreDataName];

    // 檢查指定的索引值 是否有相同的
    if (checkSameList(operateStoreData, "name", dealData.name)) return;

    const { data } = await API[API_STORE_DATA_STRUCT[dealData.type][dealData.operate + 'APIName']]({
      name: dealData.name,
      id: dealData?.id,
    });

    dispatch(addOrEditTargetStoreData({ type: operateStoreDataName, value: data }));
  };
}

export {
  setTargetStoreData,
  fetchSpecifyStatus,
};

const userProductReducer = userProductStore.reducer;
export default userProductReducer;
