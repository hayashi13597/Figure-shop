import { Routes, Route } from "react-router-dom";
import Collections from "./pages/Collections";
import Admin from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Dashboard/Product/Product";
import User from "./pages/Dashboard/User";
import Home from "./pages/Home";
import Categories from "./pages/Dashboard/Category/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="products" element={<Product />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
  );
}

export default App;
