import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type SortByBrandProps = {
  onSortChange: (option: string[]) => void;
};

interface IOptions {
  OptionValue: string;
}

const checkboxOptions: IOptions[] = [
  {
    OptionValue: "Good Smile Company",
  },
  {
    OptionValue: "Kotobukiya",
  },
  {
    OptionValue: "Max Factory",
  },
  {
    OptionValue: "MegaHouse",
  },
  {
    OptionValue: "Alter",
  },
  {
    OptionValue: "Square Enix",
  },
];

const CollectionFilter = ({ onSortChange }: SortByBrandProps) => {
  const [listOptions, setListOptions] = useState<string[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setListOptions([...listOptions, value]);
      handleSelectedBrand([...listOptions, value]);
    } else {
      setListOptions(listOptions.filter((option) => option !== value));
      handleSelectedBrand(listOptions.filter((option) => option !== value));
    }
  };

  const handleSelectedBrand = (option: string[]) => {
    onSortChange(option);
  };

  const handleRemoveOption = () => {
    setListOptions([]);
    handleSelectedBrand([]);
  };

  return (
    <>
      <div className="collection-filter">
        <div className="container">
          <div className="wrapper_layered_filter">
            <div className="layered_filter_container">
              <div className="layered_filter_title">
                <p className="title_filter flex items-center gap-2">
                  <FaFilter />
                  Phân loại
                </p>
              </div>
              <div
                className="layered_filter_group layered_filter_mobileContent"
                id="layered_filter_mobile"
              >
                <div className="row clearfix">
                  <div className="filter_group">
                    <div className="filter_group_block">
                      <div className="filter_group-subtitle">
                        <span>Thương hiệu</span>
                        <span className="icon-control">
                          <i className="fa fa-chevron-down"></i>
                        </span>
                      </div>
                      <div className="filter_group-content filter-brand">
                        <ul className="checkbox-list">
                          {checkboxOptions.map((option, key) => (
                            <li key={key}>
                              <input
                                type="checkbox"
                                value={option.OptionValue}
                                id={`option-${key}`}
                                onChange={handleCheckboxChange}
                                checked={listOptions.includes(
                                  option.OptionValue
                                )}
                                name="brand-filter"
                              />
                              <label htmlFor={`option-${key}`}>
                                {option.OptionValue}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collection-checked-filter">
        <div className="container">
          <div className="checked-filter" id="checked-filter">
            <p
              className={`checked-filter-option flex items-center ${
                listOptions.length == 0 ? "hidden" : ""
              }`}
            >
              Thương hiệu:
              <span className="option-bold ml-1" id="listOption">
                {listOptions.join(", ")}
              </span>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={handleRemoveOption}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionFilter;
