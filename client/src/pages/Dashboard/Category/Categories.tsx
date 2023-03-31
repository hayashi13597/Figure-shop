import { useEffect, useState, useRef } from "react";
import DataTime from "../DataTime";
import { useDispatch } from "react-redux";
import CateTable from "./CateTable";
import { Modal } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react/lib/esm/components";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { addCategory } from "./CategorySlice";
import * as Toastify from "../../../utils/toastify";

const Categories = () => {
  const title: string = "Quản lý danh mục";
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputRef.current?.value;
    console.log(value);
    dispatch(addCategory({ name: value })).then(() =>
      Toastify.successNotify("Thêm danh mục thành công")
    );
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
            Thêm mới danh mục
          </button>
          <Modal show={isOpen} onClose={() => setIsOpen(!isOpen)}>
            <ModalHeader>Thêm mới danh mục</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Tên danh mục" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    ref={inputRef}
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
        <CateTable />
      </div>
    </div>
  );
};

export default Categories;
