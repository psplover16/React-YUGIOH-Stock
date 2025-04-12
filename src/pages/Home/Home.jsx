import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button } from "@headlessui/react";
import { useEffect } from "react";
import API from "@/apis";

import { useDispatch } from "react-redux";
import {
  setCardType,
  setLanguageType,
  setIdentificationType,
  setUserAllData,
} from "@/store/modules/userProductStore";
import classNames from "classnames";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const navList = [
    {
      name: "庫存頁",
      func: () => navigate("/index"),
      pathName: "/index",
    },
    {
      name: "新增選項",
      func: () => navigate("createOption"),
      pathName: "/index/createOption",
    },
    {
      name: "增加卡片",
      func: () => navigate("addCard"),
      pathName: "/index/addCard",
    },
    {
      name: "關於我",
      func: () => navigate("about"),
      pathName: "/index/about",
    },
    {
      name: "登出",
      func: () => {
        localStorage.removeItem("personData");
        navigate("/");
      },
      pathName: "",
    },
  ];

  const fetchData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("personData")).id;
      const [cardOption, languageOption, identificationOption, userAllData] =
        await Promise.all([
          API.getCardOption(),
          API.getLanguageOption(),
          API.getIidentificationOption(),
          API.getUserAllData({ params: { id: userId } }),
        ]);

      dispatch(setCardType(cardOption.data));
      dispatch(setLanguageType(languageOption.data));
      dispatch(setIdentificationType(identificationOption.data));
      dispatch(setUserAllData(userAllData.data[0]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // const time = "2025-04-12T03:31:38.522Z";
    // const dayJSTime = dayjs(new Date(time)).format("YYYY/MM/DD");
    // const newTime = new Date(dayJSTime).toISOString();
    // console.log(newTime);
    // console.log(dayjs(new Date(newTime)).format("YYYY/MM/DD"));
    console.log(location.pathname);
    fetchData();
  }, []);

  return (
    <div className="bg-amber-50 min-h-dvh">
      <div className="container mx-auto p-4">
        <nav className="flex justify-around mb-4">
          {navList.map((val, key) => (
            <Button
              key={key}
              className={`rounded  py-2 px-4 text-sm text-white ${
                val.pathName === location.pathname
                  ? "bg-red-600 data-[hover]:bg-red-500 data-[active]:bg-red-700"
                  : "bg-amber-600 data-[hover]:bg-amber-500 data-[active]:bg-amber-700"
              }`}
              onClick={val.func}
            >
              {val.name}
            </Button>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
