import React from "react";
import services1 from "../../assets/images/service-1.jpg";
import services2 from "../../assets/images/service-2.jpg";
import services3 from "../../assets/images/service-3.jpg";
import { BiChevronRight } from "react-icons/bi";

const Services = () => {
  return (
    <section className="section-services">
      <div className="container md:w-4/5">
        <div className="row-services">
          <div className="box-service">
            <div className="box-service__img w-full flex justify-center">
              <img src={services1} alt="" />
            </div>
            <div className="box-service__content">
              <h4>Sản phẩm chính hãng</h4>
              <div className="txt-desc">Nhập khẩu trực tiếp từ Nhật Bản</div>
              <a href="#">
                Xem chi tiết <BiChevronRight className="text-xl" />
              </a>
            </div>
          </div>
          <div className="box-service">
            <div className="box-service__img w-full flex justify-center">
              <img src={services2} alt="" />
            </div>
            <div className="box-service__content">
              <h4>Thanh toán đơn giản</h4>
              <div className="txt-desc">Chuyển khoản hoặc COD</div>
              <a href="#">
                Xem chi tiết <BiChevronRight className="text-xl" />
              </a>
            </div>
          </div>
          <div className="box-service">
            <div className="box-service__img w-full flex justify-center">
              <img src={services3} alt="" />
            </div>
            <div className="box-service__content">
              <h4>Giao hàng nhanh chóng</h4>
              <div className="txt-desc">Miễn phí với đơn hàng trên 1000K</div>
              <a href="#">
                Xem chi tiết <BiChevronRight className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
