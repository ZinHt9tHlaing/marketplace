import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { UserType } from "../../types/user";
import { clearUser } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDoc = useSelector(
    (state: RootState): UserType | null => state.reducer.user.user
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/");
  };

  const { username, email, role } = userDoc!;

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">General</h1>
      <p className="text-base font-medium mb-1">Username - {username}</p>
      <p className="text-base font-medium mb-1">Email - {email}</p>
      <p className="text-base font-medium mb-1">Role - {role}</p>
      <button
        type="button"
        onClick={logoutHandler}
        className="outline-none bg-red-600 cursor-pointer font-medium text-white px-3 py-2 rounded-md active:scale-90 duration-200"
      >
        Logout
      </button>
    </section>
  );
};

export default General;
