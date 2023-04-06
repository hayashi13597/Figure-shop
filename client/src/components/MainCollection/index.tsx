import React, { useState, useEffect } from "react";
import axios from "axios";
import RowItem from "../Order/RowItem";
import Pagination from "../Pagination";
import CollectionFilter from "./CollectionFilter";
import CollectionSoftly from "./CollectionSoftly";
import { useDispatch } from "react-redux";
import { addToCart } from "../Header/Cart/cartSlice";

interface IData {
  _id: number;
  categoryId: {
    name: string;
    _id: string;
  };
  image: string;
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

const MainCollection = () => {
  const [currentPage, setCurrentPage] = useState < number > (1);
  const [totalPages, setTotalPages] = useState < number > (0);
  const [data, setData] = useState < IData[] > ([]);
  const [sortOption, setSortOption] = useState < string > ("");
  const [sortByBrand, setSortByBrand] = useState < string[] > ([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortFilter = (option: string) => {
    setSortOption(option);
  };

  const handleSortByBrand = (option: string[]) => {
    setSortByBrand(option);
  };

  const dispatch = useDispatch();
  const handleAddToCartRedux = (cart: IData) => {
    dispatch(addToCart({cart, quantity:1}));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      let sortedData: IData[] = res.data.products;
      if (sortOption === "asc") {
        sortedData.sort((a: { price: number }, b: { price: number }) => {
          return a.price - b.price;
        });
      } else if (sortOption === "desc") {
        sortedData.sort((a: { price: number }, b: { price: number }) => {
          return b.price - a.price;
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
      let sortedArray: IData[] = [];
      sortedArray = sortedData
        .slice()
        .filter((data) => sortByBrand.includes(data.categoryId.name));

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
  const currentItems: IData[] = data.slice(startIndex, endIndex);

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
                  onHanldAddCart={handleAddToCartRedux}
                  key={item._id}
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
