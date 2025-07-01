import { Form, message } from "antd";
import type { ProductsPropType } from "../../types/products/productTypes";
import moment from "moment";
import { deleteProduct } from "../../api/products/productAxios";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getAllProduct,
}: ProductsPropType) => {
  const [form] = Form.useForm();

  const editHandler = (id: string) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(id);
    form.resetFields();
  };

  const deleteHandler = async (id: string) => {
    try {
      const response = await deleteProduct(id);
      if (response?.isSuccess) {
        message.success(response.message);
        getAllProduct();
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

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="odd:bg-white even:bg-gray-50 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" ? (
                        <span className="bg-yellow-500 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      ) : (
                        <span className="bg-green-600 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                        type="button"
                        onClick={() => editHandler(product._id)}
                        className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline active:scale-90 duration-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteHandler(product._id)}
                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline active:scale-90 duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <th>No products found</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
