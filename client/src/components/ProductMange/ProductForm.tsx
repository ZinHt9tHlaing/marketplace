import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import {
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  type CheckboxOptionType,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  createProduct,
  getOldProduct,
  updateProduct,
} from "../../api/products/productAxios";
import type {
  ProductFormProps,
  ProductType,
} from "../../types/products/productTypes";

const ProductForm = ({
  setActiveTabKey,
  getAllProduct,
  editMode,
  editProductId,
}: ProductFormProps) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState<string | null>(null);

  const selectOptions = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_living",
      label: "Home and Living",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "sports_and_outdoors",
      label: "Sports and Outdoors",
    },
    {
      value: "automotive_and_motorcycles",
      label: "Automotive and Motorcycles",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
    {
      value: "books_and_stationery",
      label: "Books and Stationery",
    },
    {
      value: "groceries_and_food",
      label: "Groceries and Food",
    },
    {
      value: "pet_supplies",
      label: "Pet Supplies",
    },
    {
      value: "health_and_wellness",
      label: "Health and Wellness",
    },
    {
      value: "baby_and_maternity",
      label: "Baby and Maternity",
    },
    {
      value: "tools_and_home_improvement",
      label: "Tools and Home Improvement",
    },
    {
      value: "office_and_business",
      label: "Office and Business",
    },
    {
      value: "music_and_entertainment",
      label: "Music and Entertainment",
    },
    {
      value: "travel_and_luggage",
      label: "Travel and Luggage",
    },
    {
      value: "handmade_and_crafts",
      label: "Handmade and Crafts",
    },
    {
      value: "collectibles_and_antiques",
      label: "Collectibles and Antiques",
    },
    {
      value: "digital_products",
      label: "Digital Products",
    },
    {
      value: "services",
      label: "Services",
    },
  ];

  const checkboxOptions: CheckboxOptionType<string>[] = [
    { label: "Accessories", value: "Accessories" },
    { label: "Warranty", value: "Warranty" },
    { label: "Voucher", value: "Voucher" },
  ];

  const onFinishHandler = async (values: ProductType) => {
    try {
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        response = await updateProduct(values);
      } else {
        response = await createProduct(values);
      }
      if (response?.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getAllProduct();
        setActiveTabKey("1");
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

  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId!);

      if (response?.isSuccess) {
        message.success("Edit mode on!!");
        const { name, description, price, category, usedFor, details, seller } =
          response.productDoc;
        setSellerId(seller._id);
        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_used_for: usedFor,
          product_details: details,
        };
        form.setFieldsValue(modifiedProduct);
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
    if (editMode) {
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [editMode]);

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-bold my-2">
        {editMode ? "Update your product here" : " What do you want to sell?"}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        {/* name */}
        <Form.Item
          name={"product_name"}
          label={"Product name"}
          rules={[{ required: true, message: "Please enter a product name" }]}
          hasFeedback
        >
          <Input placeholder="Enter a product name..." />
        </Form.Item>
        {/* description */}
        <Form.Item
          name={"product_description"}
          label={"Product description"}
          rules={[
            { required: true, message: "Please enter a product description" },
          ]}
          hasFeedback
        >
          <TextArea placeholder="Enter a product description..." rows={4} />
        </Form.Item>
        <Row gutter={16}>
          {/* price  */}
          <Col span={8}>
            <Form.Item
              name={"product_price"}
              label={"Price"}
              rules={[
                { required: true, message: "Please enter a product price" },
              ]}
              hasFeedback
            >
              <Input type="number" placeholder="Enter a product price..." />
            </Form.Item>
          </Col>
          {/* category */}
          <Col span={8}>
            <Form.Item
              name={"product_category"}
              label={"Choose a category"}
              rules={[{ required: true, message: "Please enter a Category" }]}
              hasFeedback
            >
              <Select defaultValue={""} options={selectOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* used for */}
            <Form.Item
              name={"product_used_for"}
              label={"Used for"}
              rules={[
                { required: true, message: "Product't used time must write." },
              ]}
              hasFeedback
            >
              <Input placeholder="eg: 3months ago" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={"product_details"} label={"This product has"}>
          <Checkbox.Group options={checkboxOptions} defaultValue={[""]} />
        </Form.Item>
        <button
          type="submit"
          className="font-medium text-md md:text-lg bg-indigo-600 text-white w-full cursor-pointer rounded-md px-2 py-1 flex items-center justify-center gap-1 active:scale-95 duration-200"
        >
          <SquaresPlusIcon width={24} />{" "}
          {editMode ? "Update Product" : "Sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default ProductForm;
