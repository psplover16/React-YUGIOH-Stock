import classNames from "classnames";

export default function StockTable({
  theadData, // STOCK_TITLE
  emptyTheadTd, // setSearchStr
  //   <input
  //   type="text"
  //   placeholder="搜索欄位"
  //   className="bg-amber-50"
  //   onChange={(e) => setSearchStr(e.target.value)}
  // />
  tbodyData, // filterStockData

  formatTdWord,
  editItem,
}) {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {theadData.map((val, key) => (
            <th
              className="border border-gray-300 px-4 py-2 text-nowrap"
              key={key}
            >
              {val.name}
            </th>
          ))}
          <th className="border border-gray-300 p-2">{emptyTheadTd}</th>
        </tr>
      </thead>
      <tbody>
        {tbodyData?.map((allVal, allKey) => (
          <tr
            className={allKey % 2 === 0 ? "bg-white" : "bg-gray-100"}
            key={allKey}
            onClick={() => editItem(allVal.id)}
          >
            {theadData.map((stockVal, stockKey) => (
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
                      "max-w-[230px] truncate": stockKey === 12,
                    })}
                  >

                    {formatTdWord(stockVal.APIKey, allVal[stockVal.APIKey])}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
