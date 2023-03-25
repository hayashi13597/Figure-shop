import { Routes, Route } from "react-router-dom";
import Collections from "./pages/Collections";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
    </Routes>
  );
}

export default App;
