import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProductImage } from "../../api/products/productAxios";
import { message } from "antd";

type UploadProps = {
  editProductId: string | null;
  setActiveTabKey: (key: string) => void;
};

const Upload = ({ editProductId, setActiveTabKey }: UploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (!selectedImages) return;

    const selectedImagesArray = Array.from(selectedImages);

    setImages((prev) => [...prev, ...selectedImagesArray]);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deletePreviewImageHandler = (img: string) => {
    const indexToDelete = previewImages.findIndex((imgUrl) => imgUrl === img);

    if (indexToDelete !== -1) {
      const updatedPreviewImages = [...images];
      updatedPreviewImages.splice(indexToDelete, 1);

      setImages(updatedPreviewImages);
      setPreviewImages((prevImg) => prevImg.filter((imgUrl) => imgUrl !== img));

      URL.revokeObjectURL(img);
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`product_images`, images[i]);
    }

    formData.append("product_id", editProductId!);

    try {
      const response = await uploadProductImage(formData);
      if (response.isSuccess) {
        message.success(response.message);
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

  return (
    <section>
      <h1 className=" text-2xl font-bold mb-4 text-indigo-600">
        Upload your product's images here.
      </h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload-img"
          className="p-2 rounded-md border-2 border-dashed border-indigo-600 font-medium my-3 cursor-pointer active:scale-90 duration-200"
        >
          Upload from device
        </label>
        <input
          type="file"
          name="product_images"
          hidden
          id="upload-img"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={onChangeHandler}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
          {previewImages &&
            previewImages.map((img, index) => (
              <div key={index} className="h-32 relative group">
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className="absolute bottom-2 right-3 fill-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity active:scale-90 duration-200"
                  onClick={() => deletePreviewImageHandler(img)}
                />
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="block my-4 text-white bg-indigo-600 rounded-md px-3 py-2 font-medium cursor-pointer active:scale-90 duration-200"
        >
          Upload to product
        </button>
      </form>
    </section>
  );
};

export default Upload;
