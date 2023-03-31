import { Button, Label, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateCategory } from "./CategorySlice";
import * as Toastify from "../../../utils/toastify";

interface ICategory {
  _id: number;
  name: string;
}

const ModalCateItem: React.FC<{
  onClose: () => void;
  selectedCategory: ICategory;
  setSelectedCategory: any;
  setShowModal: any;
}> = ({ onClose, selectedCategory, setSelectedCategory, setShowModal }) => {
  const [getCategories, setGetCategories] = useState([]);
  const { name } = selectedCategory;
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
    const newForm = {
      _id: selectedCategory._id,
      name: selectedCategory.name,
    };
    dispatch(updateCategory(newForm))
      .then(() => {
        Toastify.successNotify("Cập nhật danh mục thành công");
      })
      .catch((error: any) => {
        Toastify.errorNotify("Cập nhật danh mục thấy bại");
      });
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center">
      <form
        className="w-1/2 bg-white opacity-100 m-auto min-h-3/4 flex flex-col gap-4 p-5 relative"
        onSubmit={handleSubmitForm}
      >
        <h2 className="text-center">Sửa danh mục</h2>
        <AiOutlineClose
          className="absolute right-5 top-5 cursor-pointer text-xl"
          onClick={onClose}
        />
        <div>
          <TextInput
            type="hidden"
            name="productId"
            value={selectedCategory._id.toString()}
          />
          <div className="mb-2 block">
            <Label htmlFor="name" value="Tên sản phẩm" />
          </div>
          <TextInput
            id="name"
            value={name}
            onChange={(e) =>
              setSelectedCategory({ ...selectedCategory, name: e.target.value })
            }
            type="text"
            name="name"
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

export default ModalCateItem;
