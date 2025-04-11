import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Button, Input } from "@headlessui/react";
import { HERO_ICONS } from "@/utils/icons.jsx";
import API from "@/apis";
// import dayjs from 'dayjs';
// const newDate = dayjs(new Date()).format('YYYY-MM-DD');

import { useDispatch } from "react-redux";
import { setLoginStatus } from "@/store/modules/loginState";

export default function Login() {
  const navigate = useNavigate();

  const [isEyeOpen, setEyeStatus] = useState(false);
  const [formData, setFormData] = useState({
    account: "psplover16",
    password: "xup6rmp4vul4",
  });
  const [isAccountNotice, setAccountNotice] = useState(false);
  const [isPasswordNotice, setPasswordNotice] = useState(false);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const changeLogin = async (event) => {
    event.preventDefault();
    const { account, password } = formData;

    if (!account || !password) {
      setAccountNotice(!account);
      setPasswordNotice(!password);
      return;
    }

    const { data } = await API.login({
      params: { name: account, password: password },
    });

    if (data[0]) {
      console.log(data[0]);
      dispatch(
        setLoginStatus({
          account: data[0].name,
          password: data[0].password,
          id: data[0].id,
        })
      );
      navigate("/index");
    }
  };
  return (
    <div className="min-w-full min-h-dvh bg-amber-50">
      <form
        className="fixed top-1/2 left-1/2 -translate-1/2 flex gap-2 flex-col w-[300px] items-center"
        onSubmit={changeLogin}
      >
        <div
          className={classNames("w-full relative", { notice: isAccountNotice })}
        >
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
            "w-full rounded-lg border-none bg-black/20 py-1.5 px-3 text-base text-black",
            { notice: isPasswordNotice }
          )}
        >
          <Input
            type={isEyeOpen ? "text" : "password"}
            name="password"
            onChange={(e) => handleFormChange(e)}
            placeholder="密碼"
            value={formData.password}
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
