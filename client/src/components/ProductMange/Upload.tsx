import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  deleteSavedImages,
  getProductSavedImages,
  uploadProductImage,
} from "../../api/products/productAxios";
import { message } from "antd";

type UploadProps = {
  editProductId: string | null;
  setActiveTabKey: (key: string) => void;
};

const Upload = ({ editProductId, setActiveTabKey }: UploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>([]);

  const getSavedImages = async (product_id: string) => {
    try {
      const response = await getProductSavedImages(product_id);

      if (response.isSuccess) {
        setSavedImages(response.data.images);
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
    getSavedImages(editProductId!);
  }, []);

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
      console.log("formData", formData);
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

  const savedImageDeleteHandler = async (img: string) => {
    setSavedImages((prev) => prev.filter((e) => e !== img));
    try {
      const response = await deleteSavedImages({
        productId: editProductId,
        imgToDelete: img,
      });
      if (response.isSuccess) {
        message.success(response.message);
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
      <div className="mt-2">
        <h1 className="text-lg font-medium mb-2">Saved images in cloud.</h1>
        {savedImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {savedImages.map((img) => (
              <div key={img} className="h-32 relative group">
                <img
                  src={img}
                  alt={img}
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className="absolute bottom-2 right-3 fill-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity active:scale-90 duration-200"
                  onClick={() => savedImageDeleteHandler(img)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 font-semibold text-sm mb-5">
            No images are not saved.
          </p>
        )}
      </div>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload-img"
          className="p-2 rounded-md border-2 border-dashed border-indigo-600 text-indigo-600 font-medium my-3 cursor-pointer active:scale-90 duration-200"
        >
          Upload image here
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
