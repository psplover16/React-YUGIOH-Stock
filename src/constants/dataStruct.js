const API_STORE_DATA_STRUCT = Object.freeze({
    cardVersion: {
        addAPIName: 'fetchCardOption', // 新增的API
        editAPIName: 'editCardOption', // 編輯的API
        storeDataName: 'cardType' // 動哪個store
    },
    languageType: {
        addAPIName: 'fetchLanguageOption',
        editAPIName: 'editLanguageOption',
        storeDataName: 'languageType'
    },
    identificationType: {
        addAPIName: '',
        editAPIName: '',
        storeDataName: 'identificationType'
    },
    allCardData: {
        addAPIName: '',
        editAPIName: '',
        storeDataName: 'userAllData'
    },
})


export default API_STORE_DATA_STRUCT;