import classNames from "classnames";
import styles from "@/style/custom.module.scss";

export default function StockTable({
  theadData,
  emptyTheadTd,
  tbodyData,
  noWrapTdKey,
  formatTdWord = (valKey, valValue) => valValue,
  editItem,
}) {
  return (
    <table
      className={classNames("min-w-full border border-gray-300", styles.table)}
    >
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
          {emptyTheadTd && (
            <th className="border border-gray-300 p-2">{emptyTheadTd}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {tbodyData?.map((allVal, allKey) => (
          <tr
            key={allKey}
            onClick={() => editItem(allVal?.id)}
            className={classNames(editItem && "cursor-pointer")}
          >
            {theadData.map((stockVal, stockKey) => (
              <td
                className={classNames("border border-gray-300 px-4 py-2", {
                  "text-nowrap": noWrapTdKey.includes(stockKey),
                })}
                key={stockKey}
                title={
                  stockKey === theadData.length - 1
                    ? formatTdWord(stockVal.APIKey, allVal[stockVal.APIKey])
                    : undefined
                }
                colSpan={
                  emptyTheadTd
                    ? stockKey === theadData.length - 1
                      ? 2
                      : undefined
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <div
                    className={classNames({
                      "max-w-[230px] truncate": stockKey === 12,
                    })}
                  >
                    {formatTdWord(
                      stockVal.APIKey,
                      allVal,
                      allKey,
                      stockKey
                    )}
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
