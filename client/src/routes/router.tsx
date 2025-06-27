import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../pages/Auth/RegisterForm";
import LoginForm from "../pages/Auth/LoginForm";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ProfileIndex from "../pages/Profile/ProfileIndex";
import AuthProvider from "../providers/AuthProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/profile",
        element: (
          <AuthProvider>
            <ProfileIndex />
          </AuthProvider>
        ),
      },
    ],
  },
]);
