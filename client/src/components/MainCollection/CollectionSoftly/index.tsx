import React, { useState } from "react";

import { FaSortAlphaDown } from "react-icons/fa";

type CollectionSoftlyProps = {
  onSortChange: (option: string) => void;
};

interface IOptionsFilter {
  value: string;
  text: string;
}

const optionsFilter: IOptionsFilter[] = [
  {
    value: "asc",
    text: "Giá: Tăng dần",
  },
  {
    value: "desc",
    text: "Giá: Giảm dần",
  },
  {
    value: "atoz",
    text: "Tên: A-Z",
  },
  {
    value: "ztoa",
    text: "Tên: Z-A",
  },
];

const CollectionSoftly = ({ onSortChange }: CollectionSoftlyProps) => {
  const [activeSort, setActiveSort] = useState(null);

  const handleCheckFilter = (e: { target: any }) => {
    const checked = e.target.closest(".sort-by li");
    if (!checked) return;
    setActiveSort(checked.innerText);
  };

  const handleSortOptionChange = (option: string) => {
    onSortChange(option);
  };

  return (
    <div className="collection-softly">
      <div className="collection-softly-filter flex items-center gap-3">
        <FaSortAlphaDown />
        Sắp xếp
      </div>
      <div className="collection-softly-option">
        <ul className="sort-by" onClick={handleCheckFilter}>
          {optionsFilter.map((option) => (
            <li
              className={activeSort === option.text ? "sort-active" : ""}
              key={option.value}
              onClick={() => handleSortOptionChange(`${option.value}`)}
            >
              <span>{option.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionSoftly;
