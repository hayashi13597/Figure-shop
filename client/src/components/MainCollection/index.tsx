import { useState, useEffect } from "react";
import axios from "axios";
import RowItem from "../Order/RowItem";
import Pagination from "../Pagination";
import CollectionFilter from "./CollectionFilter";
import CollectionSoftly from "./CollectionSoftly";

interface Data {
  id: number;
  category: string;
  image: string[];
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

const MainCollection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [data, setData] = useState<Data[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [sortByBrand, setSortByBrand] = useState<string[]>([]);
  const [itemCart, setItemCart] = useState<Data[]>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortFilter = (option: string) => {
    setSortOption(option);
  };

  const handleSortByBrand = (option: string[]) => {
    setSortByBrand(option);
  };

  useEffect(() => {
    const localStorageItem = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as Data[];
    setItemCart(localStorageItem);
  }, []);

  const handleAddToCart = (cart: Data) => {
    const existingItem = itemCart.find((item) => item.id === cart.id);
    if (existingItem) {
      const updatedCart = itemCart.map((cartItem) => {
        if (cartItem.id === cart.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setItemCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...itemCart, cart];
      setItemCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5173/src/assets/json/data.json"
      );
      let sortedData: Data[] = res.data;
      if (sortOption === "asc") {
        sortedData.sort((a: { price: string }, b: { price: string }) => {
          return (
            parseInt(a.price.split(",").join("")) -
            parseInt(b.price.split(",").join(""))
          );
        });
      } else if (sortOption === "desc") {
        sortedData.sort((a: { price: string }, b: { price: string }) => {
          return (
            parseInt(b.price.split(",").join("")) -
            parseInt(a.price.split(",").join(""))
          );
        });
      } else if (sortOption === "atoz") {
        sortedData.sort((a: { name: string }, b: { name: string }) => {
          return a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : 0;
        });
      } else if (sortOption === "ztoa") {
        sortedData.sort((a: { name: string }, b: { name: string }) => {
          return a.name.toLowerCase() > b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() < b.name.toLowerCase()
            ? 1
            : 0;
        });
      }
      let sortedArray: Data[] = [];
      sortedArray = sortedData
        .slice()
        .filter((data) => sortByBrand.includes(data.category));

      if (sortedArray.length > 0) {
        const total = Math.ceil(sortedArray.length / 8);
        setTotalPages(total);
        setData(sortedArray);
      } else {
        const total = Math.ceil(sortedData.length / 8);
        setTotalPages(total);
        setData(sortedData);
      }
    };
    fetchData();
  }, [sortOption, sortByBrand]);

  const startIndex: number = (currentPage - 1) * 8;
  const endIndex: number = startIndex + 8;
  const currentItems: Data[] = data.slice(startIndex, endIndex);

  return (
    <div className="wrapper-mainCollection md:w-4/5 mx-auto">
      <div className="collection-heading">
        <div className="container">
          <div className="row">
            <h1 className="title">Tất cả sản phẩm</h1>
            <CollectionSoftly onSortChange={handleSortFilter} />
          </div>
        </div>
      </div>
      <CollectionFilter onSortChange={handleSortByBrand} />
      <div className="collection-listproduct">
        <div className="container">
          <div className="wraplist-collection">
            <div className="row listProduct-row" id="collection-body">
              {currentItems.map((item) => (
                <RowItem
                  props={item}
                  onHanldAddCart={handleAddToCart}
                  key={item.id}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCollection;
