import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "./productSlice";
import * as Toastify from "../../../utils/toastify";

interface IProduct {
  _id: Number;
  categoryId: {
    name: string;
  };
  image: string;
  name: string;
  price: string;
  amount: string;
}

const ModalItem: React.FC<{
  onClose: () => void;
  selectedProduct: IProduct;
  setSelectedProduct: any;
  setShowModal: any;
}> = ({ onClose, selectedProduct, setSelectedProduct, setShowModal }) => {
  const [getCategories, setGetCategories] = useState([]);
  const { name, price, amount, image, _id } = selectedProduct;
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setGetCategories(res.data.categories);
    };
    getCategory();
  }, []);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValue = Object.fromEntries(formData.entries());
    const newFormData = {
      _id: formValue.productId,
      name: formValue.name,
      price: formValue.price,
      categoryId: formValue.categoryId,
      amount: formValue.amount,
      image: formValue.imageURL,
    };
    dispatch(updateProduct(newFormData)).then(() =>
      Toastify.successNotify("Cập nhật sản phẩm thành công")
    );
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center">
      <form
        className="w-1/2 bg-white opacity-100 m-auto min-h-3/4 flex flex-col gap-4 p-5 relative"
        onSubmit={handleSubmitForm}
      >
        <h2 className="text-center">Sửa sản phẩm</h2>
        <AiOutlineClose
          className="absolute right-5 top-5 cursor-pointer text-xl"
          onClick={onClose}
        />
        <div>
          <TextInput
            type="hidden"
            name="productId"
            value={selectedProduct._id.toString()}
          />
          <div className="mb-2 block">
            <Label htmlFor="name" value="Tên sản phẩm" />
          </div>
          <TextInput
            id="name"
            value={name}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
            type="text"
            name="name"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Giá" />
          </div>
          <TextInput
            id="price"
            value={price}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: e.target.value })
            }
            type="number"
            name="price"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="amount" value="Số lượng" />
          </div>
          <TextInput
            id="amount"
            value={amount}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, amount: e.target.value })
            }
            type="number"
            name="amount"
            required
          />
        </div>
        <div id="select">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Chọn danh mục" />
          </div>
          <Select id="category" name="categoryId" required>
            {getCategories.map((category: { _id: number; name: string }) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="imageURL" value="Link ảnh" />
          </div>
          <TextInput
            id="imageURL"
            value={image}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, image: e.target.value })
            }
            type="text"
            name="imageURL"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <Button className="w-1/3" type="submit">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModalItem;
