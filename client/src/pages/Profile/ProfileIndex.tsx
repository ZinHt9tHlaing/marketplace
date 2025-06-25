import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";

const ProfileIndex: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct  />,
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "Profile",
      children: "Content of Tab Pane 3",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition="left" />;
};

export default ProfileIndex;
