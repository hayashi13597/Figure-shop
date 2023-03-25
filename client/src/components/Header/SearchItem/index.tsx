import { Link } from "react-router-dom";

const SearchItem = ({ searchResult }: any) => {
  const { name, price, image } = searchResult;

  return (
    <div className="search-result">
      <div className="search-result__text">
        <Link to="/">{name}</Link>
        <span>{price}đ</span>
      </div>
      <div className="search-result__img">
        <img src={`/src/assets/images/${image[0]}`} />
      </div>
    </div>
  );
};

export default SearchItem;
