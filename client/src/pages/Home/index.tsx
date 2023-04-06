import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Collection from "../../components/Collection";
import Header from "../../components/Header";
import Order from "../../components/Order";
import ScaleFigure from "../../components/ScaleFigure";
import Services from "../../components/Services";
import Blog from "../../components/Blog";
import Footer from "../../components/Footer";
import './style.css'
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { loadUser, updateLogin } from "../../slice/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  document.title = "Figure Shop";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [])

  return (
    <>
      <ToastContainer />
      <Header />
      <Banner />
      <Collection />
      <Order />
      <section className="banner-full">
        <a className="cursor-pointer">
          <img src="/src/assets/images/section-banner-full.jpg" alt="" />
        </a>
      </section>
      <ScaleFigure />
      <Services />
      <Blog />
      <Footer />
    </>
  );
};

export default Home;
