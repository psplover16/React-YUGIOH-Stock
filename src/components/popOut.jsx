import { useState, useRef, useEffect } from "react";
import { Button, Input } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import API from "@/apis/index";
import API_STORE_DATA_STRUCT from "@/constants/dataStruct";

import { fetchSpecifyStatus } from "@/store/modules/userProductStore";

export default function Popout({
  changeOptionWordInput, // popOut要顯示的文字
  setChangeOptionWordInput, // 修改 popOut要顯示的文字
  setPopout, // 開關popOut
  struectType, // 關係到確認要打哪隻API
}) {
  const { cardType, languageType, identificationType, userAllData } =
    useSelector((state) => state.userProductData);
  const dispatch = useDispatch();
  // 滑鼠拖曳用
  const popOutRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [isDrag, setIsDrag] = useState(false);

  const dragStart = (e) => {
    setIsDrag(true);
    const rect = popOutRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const dragMove = (e) => {
    if (!isDrag) return;
    setMousePos({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const dragDown = () => {
    setIsDrag(false);
  };
  //
  useEffect(() => {
    const rect = popOutRef.current.getBoundingClientRect();
    setMousePos({
      x: window.innerWidth / 2 - rect.width / 2,
      y: window.innerHeight / 2 - rect.height / 2,
    });
  }, []);

  const changeOptionWord = async () => {
    dispatch(
      fetchSpecifyStatus({
        ...changeOptionWordInput,
        type: struectType,
        operate: "edit",
      })
    );
    setPopout(false);
  };

  return (
    <div
      className="w-full h-dvh fixed z-50 left-0 top-0 bg-[rgba(0,0,0,0.4)]"
      onMouseMove={dragMove}
      onMouseUp={dragDown}
    >
      <div
        ref={popOutRef}
        className="fixed w-[300px] bg-yellow-200 rounded-2xl"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      >
        <div
          className=" w-full bg-yellow-400 h-6 shrink-0 rounded-t-2xl"
          onMouseDown={dragStart}
        ></div>
        <div className="p-6 flex flex-col gap-4 items-center">
          <p className="text-4xl">更改選項文字</p>
          <Input
            type="text"
            placeholder="帳號"
            value={changeOptionWordInput.name}
            onChange={(e) =>
              setChangeOptionWordInput({
                id: changeOptionWordInput.id,
                name: e.target.value,
              })
            }
            className={classNames(
              "w-full block rounded-lg border-none bg-black/20 py-1.5 px-3 text-base text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setPopout(false)}
              type="button"
              className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
            >
              關閉
            </Button>
            <Button
              onClick={changeOptionWord}
              type="button"
              className="text-nowrap rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
            >
              確認
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
