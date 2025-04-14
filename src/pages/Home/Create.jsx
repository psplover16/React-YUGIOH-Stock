import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "@headlessui/react";
import API from "@/apis/index";
import classNames from "classnames";
import Popout from "@/components/popOut";

const EDIT_OPERATETYPE = Object.freeze({
  cardType: {
    edit: "editCardOption",
  },
});

export default function Create() {
  const { cardType, languageType, identificationType, userAllData } =
    useSelector((state) => state.userProductData);
  const dispatch = useDispatch();

  const [operateType, setOperateType] = useState(null);

  const [addCardTypeInput, setAddCardTypeInput] = useState(""); // 想新增的卡片版本
  const [changeOptionWordInput, setChangeOptionWordInput] = useState(""); // 更改選項的文字 (popout)
  const [isPopout, setPopout] = useState(false); // pop狀態

  const addCardTypeFunc = async () => {
    if (!addCardTypeInput) return;
    const { data } = await API.fetchCardOption({
      name: addCardTypeInput,
    });
    console.log(data);
  };

  const editCardTypeFunc = async (data) => {
    setOperateType(EDIT_OPERATETYPE.cardType.edit);
    setPopout(true);
    setChangeOptionWordInput(data.name);
    console.log(data.id);
    // const { data } = await API.fetchCardOption({
    //   name: addCardTypeInput,
    // });
  };

  return (
    <div>
      {isPopout && (
        <Popout
          operateType={operateType}
          changeOptionWordInput={changeOptionWordInput}
          setChangeOptionWordInput={setChangeOptionWordInput}
          setPopout={setPopout}
        />
      )}

      <div>
        <div>目前已有卡片版本</div>
        <div>
          {cardType.map((val, key) => (
            <div className="inline-block" key={key}>
              {" "}
              <i
                className="underline cursor-pointer"
                onClick={() => editCardTypeFunc(val)}
              >
                {val.name}
              </i>
              {key === cardType.length - 1 || "、"}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-nowrap">想新增的卡片版本：</span>
        <Input
          type="text"
          placeholder="帳號"
          value={addCardTypeInput}
          name="account"
          onChange={(e) => setAddCardTypeInput(e.target.value)}
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
      <hr className="mt-2" />
    </div>
  );
}
