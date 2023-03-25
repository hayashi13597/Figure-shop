import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Header from "../../components/Header";
import collectionBanner from "../../assets/images/collection-banner.jpg";
import MainCollection from "../../components/MainCollection";
import "./style.css";
import Footer from "../../components/Footer";

const Collections = () => {
  document.title = "Tất cả sản phẩm";
  return (
    <>
      <Header />
      <BreadCrumb />
      <div className="collection-banner">
        <img src={collectionBanner} alt="" />
      </div>
      <MainCollection />
      <Footer />
    </>
  );
};

export default Collections;
