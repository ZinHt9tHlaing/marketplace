import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Products from "./Products";
import General from "./General";
import SellProduct from "./SellProduct";
import { useState } from "react";

const ProfileIndex: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("1");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Sell Product",
      children: <SellProduct setActiveTabKey={setActiveTabKey} />,
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General ",
      children: <General />,
    },
  ];

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => setActiveTabKey(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default ProfileIndex;
