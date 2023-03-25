const ColItem = (props: any) => {
  const { id, name, image, price } = props;

  return (
    <div className="col-item">
      <div className="col-item__img">
        <a className="nothover" href="#">
          <img src={`/src/assets/images/${image[0]}`} alt="" />
        </a>
        <a className="whenhover" href="#">
          <img src={`/src/assets/images/${image[1]}`} alt="" />
        </a>
      </div>
      <div className="col-item__detail">
        <h3>
          <a href="#">{name}</a>
        </h3>
        <p className="item-detail__price">{price}đ</p>
      </div>
    </div>
  );
};

export default ColItem;
