import { STOCK_TITLE } from "@/constants/stock";
import { useSelector } from "react-redux";
import { Button } from "@headlessui/react";
import dayjs from "dayjs";
import classNames from "classnames";

export default function Stock() {
  const { cardType, languageType, identificationType, userAllData } =
    useSelector((state) => state.userProductData);

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
          <th className="border border-gray-300 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {userAllData?.allProduct?.map((allVal, allkey) => (
          <tr
            className={allkey % 2 === 0 ? "bg-white" : "bg-gray-100"}
            key={allkey}
          >
            {STOCK_TITLE.map((stockVal, stockKey) => (
              <td
                className={classNames("border border-gray-300 px-4 py-2", {
                  "text-nowrap": stockVal.APIKey === "cardNumber",
                })}
                key={stockKey}
              >
                {formatTdWord(stockVal.APIKey, allVal[stockVal.APIKey])}
              </td>
            ))}
            <td className="border border-gray-300 px-1 py-2 text-center">
              <Button
                className="text-nowrap rounded bg-gray-600 py-2 px-4 text-sm text-white data-[hover]:bg-gray-500 data-[active]:bg-gray-700"
                onClick={() => editItem(allVal.id)}
              >
                編輯
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
