import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../pages/Auth/RegisterForm";
import LoginForm from "../pages/Auth/LoginForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);
