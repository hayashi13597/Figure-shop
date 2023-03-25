import { useState, useEffect } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import SearchItem from "../SearchItem";
import NoneItem from "../SearchItem/NoneItem";

interface searchResult {
  id: number;
  image: string[];
  category: string;
  name: string;
  price: string;
  createdAt: string;
  amount: number;
}

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<searchResult[]>([]);
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);

  const handleInputChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSeach = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5173/src/assets/json/data.json"
      );
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="header-middle__input">
      <input
        type="text"
        placeholder="Nhập sản phẩm bạn muốn tìm kiếm...?"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search__btn">
        <BiSearch className="text-2xl" onClick={handleSeach} />
      </button>
      <div
        className="header-search__wrap"
        style={{ maxHeight: "305px", overflow: "auto" }}
        id="search-result"
      >
        {searchResults.length > 0 ? (
          searchResults.map((searchResult, key) => (
            <SearchItem searchResult={searchResult} key={key} />
          ))
        ) : (
          <NoneItem />
        )}
      </div>
    </div>
  );
};

export default SearchForm;
