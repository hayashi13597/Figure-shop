import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlinePlus } from "react-icons/ai";
import blog1 from "../../assets/images/blog-1.jpg";
import blog2 from "../../assets/images/blog-2.jpg";
import blog3 from "../../assets/images/blog-3.jpg";
import blog4 from "../../assets/images/blog-4.jpg";
import blog5 from "../../assets/images/blog-5.jpg";

interface IBlog {
  id: number;
  image: string;
  blogTime: string;
  title: string;
  description: string;
}

const blogs: IBlog[] = [
  {
    id: 1,
    image: blog1,
    blogTime: "23 THÁNG 12, 2022",
    title: "Theo dõi lịch phát hành Japan Figure từ chính hãng",
    description: `LỊCH PHÁT HÀNH FIGURE Cập nhật nhanh nhất - chính xác nhất
    ngay tại trang chính hãng Good Smile Company xem tại đây
    Kotobukiya xem tại đây Alter xem tại đây Megehouse xem tại
    đây Max Factory xem tại đây FREEing xem tại đây Brocoli xem
    tại đây`,
  },
  {
    id: 2,
    image: blog2,
    blogTime: "23 THÁNG 08, 2022",
    title: "Khi nào 1 figure có tại Nhật Bản?",
    description: `KHI NÀO 1 FIGURE "CÓ" TẠI NHẬT BẢN?KHI "CÓ" THÌ SỐ LƯỢNG
    NHIỀU KHÔNG?"CÓ" RỒI MỚI ĐẶT LIỆU KỊP KHÔNG? Đây là những
    câu hỏi được rất nhiều bạn quan tâm.`,
  },
  {
    id: 3,
    image: blog3,
    blogTime: "23 THÁNG 04, 2022",
    title: "Kakeibo phương pháp tiết kiệm, chi tiêu hợp lý",
    description: `Thận nhiêu/ trái?Bán máu bao nhiêu cho đủ?Lại tốn tiền nữa
    rồi...Những câu hỏi quen thuộc đều nhằm vào 1 vấn đề
    chung: Làm sao để chi tiêu hợp lí`,
  },
  {
    id: 4,
    image: blog4,
    blogTime: "23 THÁNG 01, 2022",
    title: "[TUTORIAL] Hướng dẫn làm rèm cửa",
    description: `24/6/2017 bởi VinceHôm nay tôi sẽ hướng dẫn làm một chiếc
    rèm cửa mini như thế này.Bạn có thể sử dụng nó để trang
    trí cho căn phòng của các bạn`,
  },
  {
    id: 5,
    image: blog5,
    blogTime: "11 THÁNG 3, 2023",
    title: "Phân biệt hàng real và fake: Nendoroid Kirby",
    description: `Hiện nay, các phiên bản hàng giả của Nendoroid Kirby từ Good Smile Company đang được bán trên các sàn đấu giá online và trang web bán hàng. Figure giả là mặt hàng trái phép được làm dựa trên figure chính hãng mà không được cấp phép từ Good Smile Company, do đó, chúng ta không nên ủng hộ các loại figure giả. Nhiều trường hợp các figure giả vẫn có logo chính hãng của Good Smile Company hoặc các công ty phát hành, tuy nhiên những logo này được sử dụng trái phép. Hãy luôn cẩn thận khi mua hàng online.`,
  },
];

const index = () => {
  return (
    <section className="section-blog">
      <div className="container md:w-4/5 text-center">
        <div className="section-heading my-7">
          <h2 className="htitle mb-3 text-[28px]">
            <a href="#">Dành cho người mới bắt đầu</a>
          </h2>
          <p className="subTitle text-sm">Hướng dẫn cơ bản</p>
        </div>
        <div className="blog-content blogSwiper">
          <Swiper slidesPerView={3} spaceBetween={30}>
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <div className="blog-item">
                  <div className="blog-item__img">
                    <a href="#">
                      <img src={blog.image} alt="" />
                    </a>
                    <span className="blog-time">{blog.blogTime}</span>
                  </div>
                  <div className="blog-item__detail">
                    <h3 className="art-title">
                      <a href="#">{blog.title}</a>
                    </h3>
                    <div className="art-excerpt">{blog.description}</div>
                    <p className="art-link">
                      <a href="#">
                        <span className="icon-plus">
                          <AiOutlinePlus />
                        </span>
                        Xem thêm
                      </a>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default index;
