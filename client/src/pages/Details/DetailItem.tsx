import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import { persistStore } from "redux-persist";
import { addToCart } from '../../components/Header/Cart/cartSlice';

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

type ContentRefType = {
  current: HTMLDivElement | null;
};

const DetailItem: React.FC<{ props: IData }> = ({ props }) => {
  const item = props;
  document.title = item.name;
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const contentRef = useRef < HTMLDivElement > (null);
  const dispatch = useDispatch();
  const store = useStore();

  const handleAddToCartRedux = (cart: IData) => {
    dispatch(addToCart({ cart, quantity }));
    persistStore(store).flush();
  };

  useEffect(() => {
    const scrollWithDiv = () => {
      window.addEventListener("scroll", () => {
        if (contentRef.current) {
          contentRef.current.scrollTop = window.scrollY - 200;
        }
      });
    };
    scrollWithDiv();
    return () => window.removeEventListener("scroll", () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = window.scrollY - 200;
      }
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <main className="main">
      <nav className="container flex py-2 bg-topBar mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 md:w-4/5 mx-auto">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="pointer-events-none">/</span>
              <Link
                to="/collections"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Danh mục
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="pointer-events-none">/</span>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {item?.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <section className="productDetail-infomation">
        <div className="container w-4/5">
          <div className="row" id="row">
            <div className="productDetail--gallery">
              <div className="swiper mySwiper2">
                <div className="swiper-wrapper fixImg1">
                  <div className="swiper-slide">
                    <img id="img1" src={item?.image} />
                  </div>
                </div>
              </div>
              <div className="swiper mySwiper">
                <div className="swiper-wrapper fixImg">
                </div>
              </div>
            </div>
            <div className="productDetai--content" ref={contentRef} id="productDetai--content">
              <div className="product-container-order">
                <h1 className="productDetai__title">
                  {item?.name}
                </h1>
                <div className="productDetai__price">{Intl.NumberFormat('en-US').format(item?.price || 1000000)}đ</div>
                <div className="product-form">
                  <form>
                    <div className="select-swatch">
                      <div className="title-swap">Tiêu đề:</div>
                      <div className="select-swap">
                        <div className="swap-element">
                          <label>
                            <span>Đặt trước</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="select-action">
                      <div className="quantity-area">
                        <input type="button" className="qty-btn" value="-" onClick={() => setQuantity(Math.max(quantity - 1, 1))} />
                        <input type="text" id="quantity" name="quantity" value={quantity} onChange={() => setQuantity(quantity)} min={1} className="quantity-input" disabled />
                        <input type="button" className="qty-btn" value="+" onClick={() => setQuantity(quantity + 1)} />
                      </div>
                      <div className="addcart-area">
                        <button type="button" id="add-to-cart" className="add-to-cartProduct button dark btn-addtocart btnred addtocart-modal" name="add" onClick={() => {
                          setQuantity(1);
                          handleAddToCartRedux(item as IData);
                        }
                        }>
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="clearfix" />
              <div className="product-deliverly">
                <ul className="infoList-deliverly">
                  <li>
                    <span>
                      <img className="lazyloaded" data-src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_1_ico.png?v=298" src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_1_ico.png?v=298" alt="Sản phẩm chính hãng từ Nhật Bản.
  Trước khi bạn đặt mua: vui lòng check lại giá hiện tại với admin, vì khả năng giá đã thay đổi so với lần cập nhật gần nhất, hoặc hết hàng, hết suất order. Do giới hạn số lượng, figure Nhật sẽ hiếm dần theo thời gian, dẫn tới giá tăng." />
                    </span>
                    <i className="fa fa-check" />
                    <strong>Sản phẩm chính hãng từ Nhật Bản.</strong><br />
                    <i className="fa fa-check" />
                    <strong>Trước khi bạn đặt mua:</strong>
                    vui lòng check lại giá hiện tại với admin, vì khả năng giá đã
                    thay đổi so với lần cập nhật gần nhất, hoặc hết hàng, hết suất
                    order. Do giới hạn số lượng, figure Nhật sẽ hiếm dần theo thời
                    gian, dẫn tới giá tăng.
                  </li>
                  <li>
                    <span>
                      <img className="lazyloaded" data-src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_2_ico.png?v=298" src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_2_ico.png?v=298" alt="Với sản phẩm CÓ SẴN, bạn sẽ được giao ngay.
  Với sản phẩm ĐẶT TRƯỚC, bạn cần cọc 50% giá trị sản phẩm. Hàng về VN khoảng 2-3 tuần sau khi phát hành. Lịch phát hành dự kiến như thông tin chi tiết bên dưới." />
                    </span>
                    <i className="fa fa-check" />
                    Với sản phẩm
                    <strong>CÓ SẴN, bạn sẽ được giao ngay.</strong><br />
                    <i className="fa fa-check" />
                    Với sản phẩm
                    <strong>ĐẶT TRƯỚC, bạn cần cọc 50% giá trị sản phẩm.</strong>
                    Hàng về VN khoảng 2-3 tuần sau khi phát hành. Lịch phát hành dự
                    kiến như thông tin chi tiết bên dưới.<br />
                  </li>
                  <li>
                    <span>
                      <img className="ls-is-cached lazyloaded" data-src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_3_ico.png?v=298" src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_3_ico.png?v=298" alt="Giao hàng tận nơi
  Miễn phí ship với các đơn hàng >1000K 
  Vui lòng kiểm tra sản phẩm khi nhận bưu kiện" />
                    </span>
                    <i className="fa fa-check" />
                    Giao hàng tận nơi<br />
                    <i className="fa fa-check" />
                    Miễn phí ship với các đơn hàng &gt;1000K
                    <br />
                    <i className="fa fa-check" />
                    Vui lòng kiểm tra sản phẩm khi nhận bưu kiện
                  </li>
                </ul>
              </div>
              <div className="product-description">
                <div className="panel-group">
                  <div className="panel-title"><h2>THông tin sản phẩm</h2></div>
                  <div className="panel-description" style={{ display: 'block' }}>
                    <div className="description-productdetail">
                      <p className="item-detailsection-title">
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><strong><span style={{ fontSize: '11pt' }}><span style={{ color: '#339966' }}>Giá&nbsp;cập nhật tháng 2/2023: {Intl.NumberFormat('en-US').format(item?.price || 1000000)}đ</span></span></strong></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }} id="nameProduct">{item?.name}</span></span></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '14.5px' }}>Nhân vật:&nbsp;</span><span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }}>Aerith Gainsborough</span></span></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }}>Series:&nbsp;Final Fantasy VII</span></span></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }}>Hãng sản xuất:
                          <span id="category">{item?.categoryId.name}</span></span></span></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }}>Kích thước: 11.4cm&nbsp;</span></span></span></span>
                      </p>
                      <p>
                        <span style={{ fontSize: '12pt' }}><span style={{ backgroundColor: 'white' }}><span style={{ fontSize: '11pt' }}><span style={{ color: '#333333' }}>Phát hành: 8/2023</span></span></span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailItem