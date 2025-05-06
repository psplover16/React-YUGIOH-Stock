import { useState, useMemo, useEffect } from "react";
import { Button } from "@headlessui/react";
import { STOCK_TITLE } from "@/constants/stock";
import StockTable from "@/components/StockTable";

const initCardData = {
  id: "",
  name: "",
  cardType: "",
  languageType: "",
  depreciation: "",
  identification: "",
  identificationNumber: null,
  picture: "",
  cardNumber: "",
  pieces: 1,
  cost: "",
  note: "",
  marketPrice: "",
  updateTime: "",
};

export default function AddCard() {
  const [tmpAddCard, setTmpAddCard] = useState([
    JSON.parse(JSON.stringify(initCardData)),
  ]);
  const editAddCard = (event, trKey, APIKey) => {
    setTmpAddCard((preVal) => {
      preVal[trKey][APIKey] = event.target.value;
      return [...preVal];
    });
  };

  return (
    <>
      <div>
        <Button
          onClick={() => setTmpAddCard((preVal) => [...preVal, initCardData])}
          type="button"
          className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
        >
          新增
        </Button>
      </div>
      <div>{tmpAddCard[0].name}</div>
      <StockTable
        theadData={STOCK_TITLE}
        tbodyData={tmpAddCard}
        formatTdWord={(APIKey, value, trKey, tdKey) => (
          <>
            <div>{APIKey}</div>
            <div>{value[APIKey]}</div>
            <div>{trKey}</div>
            <div>{tdKey}</div>
            <input
              type="text"
              placeholder="搜索欄位"
              className="bg-amber-50"
              onChange={(e) => editAddCard(e, trKey, APIKey)}
            />
            <div>
              <Button
                onClick={() => console.log(value[APIKey])}
                type="button"
                className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
              >
                確認
              </Button>
            </div>
          </>
        )}
        editItem={() => {}}
        noWrapTdKey={[1]}
      ></StockTable>
      <div>
        <Button
          onClick={() => console.log(tmpAddCard)}
          type="button"
          className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
        >
          送出
        </Button>
      </div>
    </>
  );
}
