import { Form, Input } from "antd";

type FormInputProps = {
  username: string;
  email: string;
  password: string;
};

type isLoginPageProps = {
  isLoginPage: boolean;
};

const AuthForm = ({ isLoginPage }: isLoginPageProps) => {
  const handleOnFinish = (values: FormInputProps) => {
    console.log("values", values);
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
              rules={[{ required: true, message: "Username is required" }]}
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
            rules={[{ required: true, message: "Password is required" }]}
            hasFeedback
          >
            <Input.Password placeholder="password..." />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full outline-none bg-indigo-600 cursor-pointer text-white py-2 rounded-md active:scale-95 duration-200"
            >
              {isLoginPage ? "Login" : "Register"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
