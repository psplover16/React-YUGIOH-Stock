import { createBrowserRouter, RouterProvider } from "react-router-dom"; // createHashRouter
import Login from "@/pages/Login";
import Home from "@/pages/Home/Home";
import Stock from "@/pages/Home/Stock";
import About from "@/pages/Home/About";
import Create from "@/pages/Home/Create";
import Edit from "@/pages/Home/Edit";
import AddCard from "@/pages/Home/AddCard";

// 創建路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/index",
    element: <Home />,
    children: [
      {
        // path: "stock", //優先權>index
        index: true, // 若訪問父級路由，則會抓children內有index的路由 (path優先權>index)
        element: <Stock />,
      },
      {
        path: "Edit",
        element: <Edit />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "createOption",
        element: <Create />,
      },
      {
        path: "addCard",
        element: <AddCard />,
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
