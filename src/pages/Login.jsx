import { useState, useRef, useEffect } from "react";
import API from "@/apis";
// import dayjs from 'dayjs';
// const newDate = dayjs(new Date()).format('YYYY-MM-DD');

import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "@/store/modules/loginState";

export default function Login() {
  const { account, password, id } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const changeLogin = (event) => {
    event.preventDefault();
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
    <div className="min-w-full min-h-dvh bg-amber-50" onSubmit={changeLogin}>
      <form className="fixed top-1/2 left-1/2 -translate-1/2">
        <div>
          <input type="text" placeholder="帳號" />
        </div>
        <div>
          <input type="password" placeholder="密碼" />
        </div>
        <button type="submit">123</button>
      </form>
    </div>
  );
}
