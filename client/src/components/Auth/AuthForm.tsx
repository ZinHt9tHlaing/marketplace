import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../../api/auth/authAxios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";

type FormInputProps = {
  username: string;
  email: string;
  password: string;
};

type isLoginPageProps = {
  isLoginPage: boolean;
};

const AuthForm = ({ isLoginPage }: isLoginPageProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleOnFinish = async (values: FormInputProps) => {
    setIsSubmitting(true);
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        if (response?.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error: unknown) {
        message.error(error.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response?.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (error: unknown) {
        message.error(error.message);
      }
    }
    setIsSubmitting(true);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-3xl text-center font-bold text-indigo-600 mb-5">
          MARKET.IO - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {/* username */}
          {!isLoginPage && (
            <Form.Item
              name={"username"}
              label={"Username"}
              rules={[
                { required: true, message: "Username is required" },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="username..." />
            </Form.Item>
          )}
          {/* email */}
          <Form.Item
            name={"email"}
            label={"Email"}
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="email..." />
          </Form.Item>
          {/* password */}
          <Form.Item
            name={"password"}
            label={"Password"}
            rules={[
              { required: true, message: "Password is required" },
              {
                min: 4,
                message: "Password must be at least 4 characters long",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password..." />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center items-center gap-2 w-full outline-none bg-indigo-600 cursor-pointer text-white py-2 rounded-md disabled:cursor-not-allowed disabled:bg-indigo-400 active:scale-95 duration-200"
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoginPage ? "Login" : "Register"}
            </button>
          </Form.Item>
          <div>
            {isLoginPage ? (
              <p>
                Don't have an account ?{" "}
                <Link
                  to={"/register"}
                  className=" font-medium text-indigo-600 hover:text-indigo-600 duration-200"
                >
                  Register here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account ?{" "}
                <Link
                  to={"/login"}
                  className=" font-medium text-indigo-600 hover:text-indigo-600 duration-200"
                >
                  Login here
                </Link>
              </p>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
