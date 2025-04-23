import { useState, useMemo } from "react";
import { STOCK_TITLE } from "@/constants/stock";
import { useSelector } from "react-redux";
import { Button } from "@headlessui/react";
import dayjs from "dayjs";
import classNames from "classnames";
import StockTable from "@/components/StockTable";

export default function Stock() {
  const { cardType, languageType, identificationType, userAllData } =
    useSelector((state) => state.userProductData);
  const [searchStr, setSearchStr] = useState("");

  const formatTdWord = (key, stringList) => {
    let str = stringList[key];
    let sendStr;
    switch (key) {
      case "languageType":
        sendStr = languageType.find((item) => item.id === str).name;
        break;
      case "cardType":
        sendStr = cardType.find((item) => item.id === str).name;
        break;
      case "identification":
        sendStr = identificationType.find((item) => item.id === str).name;
        break;
      case "updateTime":
        sendStr = dayjs(new Date(str)).format("YYYY/MM/DD");
        break;
      default:
        sendStr = str;
    }
    return sendStr;
  };

  const editItem = (id) => {
    console.log(id);
  };

  const filterTemplate = (storeData) =>
    storeData.reduce((acc, val) => {
      if (val.name.includes(searchStr)) {
        acc.push(val.id);
      }
      return acc;
    }, []);

  const filterStockData = useMemo(() => {
    if (searchStr === "") {
      return userAllData.allProduct;
    } else {
      // 檢查 語言/版本/鑑定選項/搜索的文字
      const searchOptionList = [
        ...filterTemplate(cardType),
        ...filterTemplate(languageType),
        ...filterTemplate(identificationType),
        searchStr,
      ];
      return userAllData?.allProduct?.filter((val) =>
        Object.values(val).find((value) =>
          searchOptionList.some((item) => String(value).includes(item))
        )
      );
    }
  }, [userAllData, searchStr]);

  return (
    <>
      <StockTable
        theadData={STOCK_TITLE}
        emptyTheadTd={
          <input
            type="text"
            placeholder="搜索欄位"
            className="bg-amber-50"
            onChange={(e) => setSearchStr(e.target.value)}
          />
        }
        tbodyData={filterStockData}
        formatTdWord={formatTdWord}
        editItem={editItem}
        noWrapTdKey={[1]}
      ></StockTable>
      <div>
        <Button
          onClick={() => console.log(filterStockData)}
          type="button"
          className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
        >
          新增
        </Button>
      </div>
    </>
  );
}
