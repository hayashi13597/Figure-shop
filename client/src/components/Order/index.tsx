import orderBanner from "../../assets/images/order-banner.jpg";
import orderBannerValiable from "../../assets/images/order-banner-1.jpg";
import OrderItem from "./OrderItem";

interface IOrderItem {
  title: string;
  description: string;
  bannerImage: string;
  position: boolean;
  show: number[];
}

const sectionOrder: IOrderItem[] = [
  {
    title: "Sản phẩm Order",
    description: "Những sản phẩm đã hoặc sắp phát hành & cần đặt trước",
    bannerImage: orderBanner,
    position: false,
    show: [0, 3],
  },
  {
    title: "Sản phẩm có sẳn",
    description: "Sản phẩm đang có sẵn, bạn có thể mua ngay",
    bannerImage: orderBannerValiable,
    position: true,
    show: [3, 6],
  },
];

const Order = () => {
  return (
    <section className="container w-4/5">
      {sectionOrder.map((order: IOrderItem, index: number) => (
        <OrderItem props={order} key={index} />
      ))}
    </section>
  );
};

export default Order;
