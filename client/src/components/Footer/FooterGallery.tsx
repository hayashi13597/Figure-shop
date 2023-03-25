import gallery1 from "../../assets/images/gallery-1.jpg";
import gallery2 from "../../assets/images/gallery-2.jpg";
import gallery3 from "../../assets/images/gallery-3.jpg";
import gallery4 from "../../assets/images/gallery-4.jpg";
import gallery5 from "../../assets/images/gallery-5.jpg";
import gallery6 from "../../assets/images/gallery-6.jpg";

const FooterGallery = () => {
  return (
    <section className="section-footer-gallery">
      <div className="container">
        <div className="section-heading">
          <h2 className="hTitle">Follow Figure Shop on Instagram</h2>
          <p>@figureshop.vn</p>
        </div>
      </div>
      <div className="row-gallery">
        <div className="gallery-item">
          <a href="#">
            <img src={gallery1} alt="" />
          </a>
        </div>
        <div className="gallery-item">
          <a href="#">
            <img src={gallery2} alt="" />
          </a>
        </div>
        <div className="gallery-item">
          <a href="#">
            <img src={gallery3} alt="" />
          </a>
        </div>
        <div className="gallery-item">
          <a href="#">
            <img src={gallery4} alt="" />
          </a>
        </div>
        <div className="gallery-item">
          <a href="#">
            <img src={gallery5} alt="" />
          </a>
        </div>
        <div className="gallery-item">
          <a href="#">
            <img src={gallery6} alt="" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterGallery;
