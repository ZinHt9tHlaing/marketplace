import { Tabs, type TabsProps } from "antd";
import ProductForm from "../../components/ProductMange/ProductForm";
import type { ManageProductProps } from "../../types/products/productTypes";
import { useState } from "react";
import Upload from "../../components/ProductMange/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getAllProduct,
  editMode,
  editProductId,
}: ManageProductProps) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState<string>("1");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getAllProduct={getAllProduct}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    ...(editMode
      ? [
          {
            key: "2",
            label: "Product Images",
            children: (
              <Upload
                editProductId={editProductId}
                setActiveTabKey={setActiveTabKey}
              />
            ),
          },
        ]
      : []),
  ];

  const onChangeHandler = (key: string) => {
    setProductActiveTabKey(key);
  };

  return (
    <section>
      <Tabs
        activeKey={productActiveTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
      />
    </section>
  );
};

export default ManageProduct;
