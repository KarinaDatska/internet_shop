import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Advice from "./pages/Advice";
import Constants from "./pages/Contacts";
import Delivery from "./pages/Delivery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/Advice" element={<Advice />} />
      <Route path="/Delivery" element={<Delivery />} />
      <Route path="/Contacts" element={<Constants />} />
      

    </Routes>
  );
}

export default App;
