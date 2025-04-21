import { useState, useMemo } from "react";
import { STOCK_TITLE } from "@/constants/stock";
import { useSelector } from "react-redux";
import { Button } from "@headlessui/react";
import dayjs from "dayjs";
import classNames from "classnames";

export default function Stock() {
  const { cardType, languageType, identificationType, userAllData } =
    useSelector((state) => state.userProductData);
  const [searchStr, setSearchStr] = useState("");

  const formatTdWord = (key, str) => {
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
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {STOCK_TITLE.map((val, key) => (
            <th
              className="border border-gray-300 px-4 py-2 text-nowrap"
              key={key}
            >
              {val.name}
            </th>
          ))}
          <th className="border border-gray-300 py-2">
            <input
              type="text"
              placeholder="搜索欄位"
              className="bg-amber-50"
              onChange={(e) => setSearchStr(e.target.value)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {filterStockData?.map((allVal, allKey) => (
          <tr
            className={allKey % 2 === 0 ? "bg-white" : "bg-gray-100"}
            key={allKey}
          >
            {STOCK_TITLE.map((stockVal, stockKey) => (
              <td
                className={classNames("border border-gray-300 px-4 py-2", {
                  "text-nowrap": stockVal.APIKey === "cardNumber",
                })}
                key={stockKey}
                title={
                  stockKey === 12
                    ? formatTdWord(stockVal.APIKey, allVal[stockVal.APIKey])
                    : undefined
                }
                colSpan={stockKey === 12 ? 2 : undefined}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={classNames({
                      "max-w-[180px] truncate": stockKey === 12,
                    })}
                  >
                    {formatTdWord(stockVal.APIKey, allVal[stockVal.APIKey])}
                  </div>

                  {stockKey === 12 && (
                    <Button
                      className="text-nowrap rounded bg-gray-600 py-2 px-4 text-sm text-white data-[hover]:bg-gray-500 data-[active]:bg-gray-700"
                      onClick={() => editItem(allVal.id)}
                    >
                      編輯
                    </Button>
                  )}
                </div>
              </td>
            ))}
            {/* <td className="border border-gray-300 px-1 py-2 text-center">
  
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
