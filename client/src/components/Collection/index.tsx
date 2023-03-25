import sectionIcon1 from "../../assets/images/section-icon-1.jpg";
import sectionIcon2 from "../../assets/images/section-icon-2.jpg";
import { BiChevronRight } from "react-icons/bi";

const Collection = () => {
  return (
    <section className="container md:w-4/5">
      <div className="collection">
        <div className="collection-left">
          <div className="collection-left__img">
            <a href="">
              <img src={sectionIcon1} alt="" />
            </a>
          </div>
          <div className="collection-left__text">
            <p className="tagline">Bộ sưu tập</p>
            <h2 className="htitle">Nendoroid</h2>
            <p className="txtdesc">
              Dòng chibi figure được yêu thích nhất, nhiều gương mặt, thoả sức
              tạo dáng
            </p>
            <button className="collection-btn">
              <a href="">
                Xem ngay <BiChevronRight className="text-xl" />
              </a>
            </button>
          </div>
        </div>
        <div className="collection-right">
          <div className="collection-right__img">
            <a href="#">
              <img src={sectionIcon2} alt="" />
            </a>
          </div>
          <div className="collection-right__text">
            <p className="tagline">Bộ sưu tập</p>
            <h2 className="htitle">Pop Up Parade</h2>
            <p className="txtdesc">
              Dòng scale figure kích thước sinh viên, giá tiểu học
            </p>
            <button className="collection-btn">
              <a href="">
                Xem ngay <BiChevronRight className="text-xl" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
