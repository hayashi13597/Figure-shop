import {
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialInstagram,
} from "react-icons/sl";
import { FaGooglePlusG, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="container md:w-4/5">
          <div className="row-footer">
            <div className="widget-footer">
              <h4 className="title-footer">Giới thiệu Japan Figure</h4>
              <div className="content-footer txt-address">
                <div className="content-footer__txt">
                  <p>
                    Giúp các bạn trẻ Việt Nam dễ dàng tiếp cận với mô hình
                    figure Nhật Bản
                  </p>
                </div>
                <div className="content-footer__address">
                  <ul>
                    <li className="contact-1">
                      <b>Địa chỉ:</b>
                      Quận 12, Tp. Hồ Chí Minh.
                      <br />
                      Figure Shop chưa có không gian trưng bày, bạn vui lòng hẹn
                      trước khi đến
                    </li>
                    <li className="contact-2">
                      <b>Điện thoại: </b>
                      080 2482 0786
                    </li>
                    <li className="contact-3">
                      <b>Email: </b>
                      support@figureshop.vn
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="widget-footer">
              <h4 className="title-footer">Hỗ trợ khách hàng</h4>
              <div className="content-footer">
                <ul>
                  <li className="item">
                    <a href="#">Tìm kiếm</a>
                  </li>
                  <li className="item">
                    <a href="#">Giới thiệu</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-footer">
              <h4 className="title-footer">Chăm sóc khách hàng</h4>
              <div className="content-footer">
                <div className="footer-hotline">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
                    </svg>
                  </div>
                  <div className="box-content">
                    <span>080 2482 0786</span>
                    <u>support@figureshop.vn</u>
                  </div>
                </div>
                <h4 className="fter-title">Follow Japan Figure</h4>
                <ul className="footer-social">
                  <li>
                    <a href="#">
                      <SlSocialFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <SlSocialTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <SlSocialInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaGooglePlusG />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <p>
            Copyright © 2023 <a href="#">Figure Shop</a>.
            <a href="https://www.haravan.com/"> Powered by Haravan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
