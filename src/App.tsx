import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Advice from "./pages/Advice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/Advice" element={<Advice />} />
    </Routes>
  );
}

export default App;
