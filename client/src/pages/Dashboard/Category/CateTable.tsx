import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import PaginationDash from "../PaginationDash";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ModalCateItem from "./ModalCateItem";
import { deleteCategory } from "./CategorySlice";
import * as Toastify from "../../../utils/toastify";

interface ICategory {
  _id: number;
  name: string;
}

const CATEGORIES_PER_PAGE = 8;

const CateTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [getCategories, setGetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const categories = useSelector((state: any) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/categories/");
      const data = res.data.categories;
      setGetCategories(data);
    };
    fetchProducts();
  }, [categories]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleCloseModal = () => {
    setShowModal(!showModal);
  };
  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setShowModal(!showModal);
  };
  const handleDelete = (categoryId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      dispatch(deleteCategory(categoryId)).then(() => {
        Toastify.successNotify("Xóa danh mục thành công");
      });
    }
  };

  const start = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const end = start + CATEGORIES_PER_PAGE;
  const displayedCategories = getCategories.slice(start, end);
  const totalPages = Math.ceil(getCategories.length / CATEGORIES_PER_PAGE);

  return (
    <div>
      <PaginationDash
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>Mã danh mục</Table.HeadCell>
          <Table.HeadCell>Tên danh mục</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {displayedCategories.map((category: ICategory, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{category._id}</Table.Cell>
              <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                {category.name}
              </Table.Cell>
              <Table.Cell className="flex gap-3 justify-end items-center">
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => handleEdit(category)}
                >
                  Sửa
                </button>
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => handleDelete(category._id.toString())}
                >
                  Xóa
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {showModal && (
        <ModalCateItem
          selectedCategory={selectedCategory}
          onClose={handleCloseModal}
          setSelectedCategory={setSelectedCategory}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default CateTable;
