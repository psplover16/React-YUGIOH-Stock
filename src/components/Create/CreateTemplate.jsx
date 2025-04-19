import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "@headlessui/react";
import classNames from "classnames";
import Popout from "@/components/popOut";
import { fetchSpecifyStatus } from "@/store/modules/userProductStore";
import API_STORE_DATA_STRUCT from "@/constants/dataStruct";

export default function CreateTemplate({
  struectType, // 要 對哪個 API_STORE_DATA_STRUCT 資料做操作
  nowHasOptionTitle,
  addOptionTitle,
  addOptionPlaceHolder,
  isDivider,
}) {
  const dispatch = useDispatch();

  const [addOptionInput, setAddOptionInput] = useState(""); // 想新增的卡片版本
  const [changeOptionWordInput, setChangeOptionWordInput] = useState(""); // 更改選項的文字 (popout)
  const [isPopout, setPopout] = useState(false); // pop狀態

  const allStoeState = useSelector((state) => state.userProductData);

  const dealStoreName = useMemo(
    () => API_STORE_DATA_STRUCT[struectType].storeDataName,
    [struectType]
  );

  const addCardTypeFunc = async () => {
    if (!addOptionInput) return;
    dispatch(
      fetchSpecifyStatus({
        name: addOptionInput,
        type: struectType,
        operate: "add",
      })
    );
  };

  const prepareEditFunc = async (data) => {
    setPopout(true); // 開啟popout
    setChangeOptionWordInput(data); // 設定 input的 name與id
  };

  return (
    <div>
      {/* 彈窗負責編輯的API */}
      {isPopout && (
        <Popout
          struectType={struectType}
          changeOptionWordInput={changeOptionWordInput}
          setChangeOptionWordInput={setChangeOptionWordInput}
          setPopout={setPopout}
        />
      )}

      <div>
        <div>{nowHasOptionTitle}</div>
        <div>
          {allStoeState[dealStoreName].map((val, key) => (
            <div className="inline-block" key={key}>
              {" "}
              <i
                className="underline cursor-pointer"
                onClick={() => prepareEditFunc(val)}
              >
                {val.name}
              </i>
              {key === allStoeState[dealStoreName].length - 1 || "、"}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-nowrap">{addOptionTitle}：</span>
        <Input
          type="text"
          placeholder={addOptionPlaceHolder}
          value={addOptionInput}
          name="account"
          onChange={(e) => setAddOptionInput(e.target.value)}
          className={classNames(
            "w-[200px] block rounded-lg border-none bg-black/20 py-1.5 px-3 text-base text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
        <Button
          onClick={addCardTypeFunc}
          type="button"
          className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
        >
          送出
        </Button>
      </div>
      {isDivider && <hr className="mt-2" />}
    </div>
  );
}
