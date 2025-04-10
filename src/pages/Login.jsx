// import { useState, useRef, useEffect } from 'react';
// import dayjs from 'dayjs';
// const newDate = dayjs(new Date()).format('YYYY-MM-DD');

import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "@/store/modules/loginState";

export default function Login() {
  const { account, password, id } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const changeLogin = () => {
    console.log(123);
    dispatch(
      setLoginStatus({
        account: 1,
        password: 2,
        id: 3,
      })
    );
  };
  return (
    <>
      <div className="bg-red-500">
        <div>
          {account}:{password}:{id}
        </div>
        <button onClick={changeLogin}>123</button>
      </div>
    </>
  );
}
