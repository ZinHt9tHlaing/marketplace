import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/16/solid";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.reducer.user);

  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white">
      <Link to={"/"}>
        <h1 className="text-3xl font-bold">MARKET.IO</h1>
      </Link>
      {user ? (
        <Link
          to={"/profile"}
          className=" fill-black rounded-md px-2 py-1 flex items-center gap-1 active:scale-90 duration-200"
        >
          <UserIcon width={26} /> Profile
        </Link>
      ) : (
        <div className="flex items-center gap-3 text-base font-medium">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
