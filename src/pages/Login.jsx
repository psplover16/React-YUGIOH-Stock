import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
// import { Button } from "@headlessui/react";
import { Button, Description, Field, Input, Label } from "@headlessui/react";
import { HERO_ICONS } from "@/utils/icons.jsx";
import API from "@/apis";
// import dayjs from 'dayjs';
// const newDate = dayjs(new Date()).format('YYYY-MM-DD');

import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "@/store/modules/loginState";

export default function Login() {
  const [isEyeOpen, setEyeStatus] = useState(false);
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //
  const { account, password, id } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const changeLogin = async (event) => {
    event.preventDefault();
    const { data } = await API.login({
      params: { name: formData.account, password: formData.password },
    });
    console.log(data);
    dispatch(
      setLoginStatus({
        account: 1,
        password: 2,
        id: 3,
      })
    );
  };
  //
  useEffect(() => {
    async function fetchLogin() {
      const { data } = await API.login({
        params: { name: "psplover16", password: "xup6rmp4vul4" },
      });
      console.log(data);
    }
    fetchLogin();
  }, []);
  return (
    <div className="min-w-full min-h-dvh bg-amber-50">
      <form
        className="fixed top-1/2 left-1/2 -translate-1/2 flex gap-1 flex-col w-[300px] items-center"
        onSubmit={changeLogin}
      >
        <div className="w-full">
          <Input
            type="text"
            placeholder="帳號"
            value={formData.account}
            name="account"
            onChange={(e) => handleFormChange(e)}
            className={classNames(
              "block w-full rounded-lg border-none bg-black/20 py-1.5 px-3 text-base text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </div>
        <div
          className={classNames(
            "w-full flex justify-between",
            "w-full rounded-lg border-none bg-black/20 py-1.5 px-3 text-base text-black"
          )}
        >
          <Input
            type={isEyeOpen ? "text" : "password"}
            name="password"
            onChange={(e) => handleFormChange(e)}
            placeholder="密碼"
            className="flex-grow focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          />
          <div className="size-6" onClick={() => setEyeStatus(!isEyeOpen)}>
            {isEyeOpen ? HERO_ICONS.eyeOpen : HERO_ICONS.eyeClose}
          </div>
        </div>
        <Button
          type="submit"
          className="w-1/3 rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
        >
          送出
        </Button>
      </form>
    </div>
  );
}
