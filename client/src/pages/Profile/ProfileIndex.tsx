import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import Products from "./Products";
import General from "./General";
import { useEffect, useState } from "react";
import type { ProductDocType } from "../../types/products/productTypes";
import { getAllProducts } from "../../api/products/productAxios";
import ManageProduct from "./ManageProduct";

const ProfileIndex: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("1");
  const [products, setProducts] = useState<ProductDocType[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [manageTabKey, setManageTabKey] = useState<string>("1");

  const getAllProduct = async () => {
    try {
      const response = await getAllProducts();
      if (response?.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
      setManageTabKey("1");
    }
    getAllProduct();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getAllProduct={getAllProduct}
          setManageTabKey={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getAllProduct={getAllProduct}
          editMode={editMode}
          editProductId={editProductId}
          manageTabKey={manageTabKey}
        />
      ),
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

  const onChangeHandler = (key: string) => {
    setActiveTabKey(key);
    setEditMode(false);
  };

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default ProfileIndex;
