import { Button, Input } from "@headlessui/react";
import classNames from "classnames";

export default function Popout({
  changeOptionWordInput,
  setChangeOptionWordInput,
  setPopout,
  changeOptionWord,
}) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-[300px] bg-yellow-200 flex flex-col gap-4 items-center p-6 rounded-2xl">
      <p className="text-4xl">更改選項文字</p>
      <Input
        type="text"
        placeholder="帳號"
        value={changeOptionWordInput}
        onChange={(e) => setChangeOptionWordInput(e.target.value)}
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
  );
}
