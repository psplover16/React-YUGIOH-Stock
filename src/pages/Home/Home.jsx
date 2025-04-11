import { useSelector } from "react-redux";

export default function Home() {
  const { account, password, id } = useSelector((state) => state.loginStatus);
  return (
    <>
      <div className="">
        <div>Home</div>
        <div>{account}</div>
        <div>{id}</div>
      </div>
    </>
  );
}
