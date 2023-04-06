import React from "react";
import { Routes, Route } from "react-router-dom";
import Collections from "./pages/Collections";
import Admin from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Dashboard/Product/Product";
import User from "./pages/Dashboard/Users/User";
import Home from "./pages/Home";
import Categories from "./pages/Dashboard/Category/Categories";
import Register from "./components/register";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Order from "./pages/Dashboard/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:id" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="products" element={<Product />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
