import { useEffect, useState } from "react";
import DataTime from "../DataTime";
import { Modal } from "flowbite-react";
import {
  Button,
  Label,
  TextInput,
  Select,
} from "flowbite-react/lib/esm/components";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { useDispatch } from "react-redux";
import { addProductToDB } from "./productSlice";
import axios from "axios";
import TableItem from "./TableItem";
import * as Toastify from "../../../utils/toastify";

const Product = () => {
  const title: string = "Quản lý sản phẩm";
  const [isOpen, setIsOpen] = useState(false);
  const [getCategories, setGetCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setGetCategories(res.data.categories);
    };
    getCategory();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValue = Object.fromEntries(formData.entries());
    const newFormData = {
      name: formValue.name,
      price: formValue.price,
      categoryId: formValue.categoryId,
      amount: formValue.amount,
      image: formValue.imageURL,
    };
    dispatch(addProductToDB(newFormData)).then(() => {
      Toastify.successNotify("Thêm sản phẩm thành công");
    });
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-14 py-4 relative">
      <DataTime title={title} />
      <div className="bg-white mt-5 rounded">
        <div className="w-full border-b-2 border-slate-800">
          <button
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 m-3"
            onClick={() => setIsOpen(true)}
          >
            Thêm mới sản phẩm
          </button>
          <Modal show={isOpen} onClose={() => setIsOpen(!isOpen)}>
            <ModalHeader>Thêm mới sản phẩm</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Tên sản phẩm" />
                  </div>
                  <TextInput id="name" type="text" name="name" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="price" value="Giá" />
                  </div>
                  <TextInput id="price" type="number" name="price" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="amount" value="Số lượng" />
                  </div>
                  <TextInput id="amount" type="number" name="amount" required />
                </div>
                <div id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="category" value="Chọn danh mục" />
                  </div>
                  <Select id="category" name="categoryId" required>
                    {getCategories.map(
                      (category: { _id: number; name: string }) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      )
                    )}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="imageURL" value="Link ảnh" />
                  </div>
                  <TextInput
                    id="imageURL"
                    type="text"
                    name="imageURL"
                    required
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Button className="w-1/3" type="submit">
                    Xác nhận
                  </Button>
                  <Button className="w-1/3" onClick={() => setIsOpen(!isOpen)}>
                    Hủy
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
      <div className="pt-5">
        <TableItem />
      </div>
    </div>
  );
};

export default Product;
