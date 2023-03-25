import { useState, useEffect } from "react";
import _ from "lodash";
import ColItem from "./ColItem";

interface Data {
  id: number;
  category: string;
  image: string[];
  name: string;
  price: number;
  createdAt: string;
  Amount: number;
}

const ScaleFigure = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5173/src/assets/json/data.json"
      ).then((res) => res.json());
      setData(res);
    };
    fetchData();
  }, []);
  const chunkedData = _.chunk(data.slice(10, 22), 4);

  return (
    <section className="container md:w-4/5 scale-figure">
      <div className="scale-figure__heading orders-heading">
        <h2 className="htitle">
          <a href="#">Scale Figure</a>
        </h2>
        <p className="subTitle">Những figure được chế tác theo tỉ lệ chuẩn</p>
      </div>
      <div className="figure-content">
        <div className="figure-content__products" id="scale-figures">
          {chunkedData.map((items, index) => (
            <div className="product-col" key={index}>
              {items.map((item, index) => (
                <ColItem {...item} key={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScaleFigure;
