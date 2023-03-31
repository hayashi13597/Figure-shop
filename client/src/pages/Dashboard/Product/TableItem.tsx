import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import PaginationDash from "../PaginationDash";
import ModalItem from "./ModalItem";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteProduct } from "./productSlice";
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

const PRODUCTS_PER_PAGE = 3;

// const TableItem: React.FC<{ products: IProduct[] }> = ({ products }) => {
const TableItem = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [getProduct, setGetProduct] = useState([]);
  const products = useSelector((state: any) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products/");
      const data = res.data.products;
      setGetProduct(data);
    };
    fetchProducts();
  }, [products]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const displayedProducts = getProduct.slice(start, end);

  const totalPages = Math.ceil(getProduct.length / PRODUCTS_PER_PAGE);

  const handleEdit = (product: IProduct) => {
    setShowModal(!showModal);
    setSelectedProduct(product);
  };
  const handleDelete = (productId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch(deleteProduct(productId)).then(() =>
        Toastify.successNotify("Xóa sản phẩm thành công")
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <PaginationDash
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>Tên SP</Table.HeadCell>
          <Table.HeadCell>Giá</Table.HeadCell>
          <Table.HeadCell>Số lượng</Table.HeadCell>
          <Table.HeadCell>Danh mục</Table.HeadCell>
          <Table.HeadCell>Hình ảnh</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {displayedProducts.map((product: IProduct, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                {product.name}
              </Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.amount}</Table.Cell>
              <Table.Cell>{product.categoryId.name}</Table.Cell>
              <Table.Cell>
                <img className="w-20 h-20 object-contain" src={product.image} />
              </Table.Cell>
              <Table.Cell className="flex justify-between gap-3 items-center">
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => handleEdit(product)}
                >
                  Sửa
                </button>
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => handleDelete(product._id.toString())}
                >
                  Xóa
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {showModal && (
        <ModalItem
          selectedProduct={selectedProduct}
          onClose={handleCloseModal}
          setSelectedProduct={setSelectedProduct}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default TableItem;
