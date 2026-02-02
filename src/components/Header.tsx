import heartIcon from "../assets/heart.png";
import shopIcon from "../assets/shopping-cart.png";
import profilIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";


const Header = () => {
   const navigate = useNavigate();
  return (
    <header className="flex items-center justify-around gap-6 px-10 py-6 bg-[#f6f6f4]">
      {/* logo */}
      <div className="text-3xl font-semibold text-gray-500 tracking-widest">Safe<span className="font-extrabold text-black">Pack</span></div>
      
      <div className=" flex items-center justify-around gap-6 text-[#678b64] font-bold text-xl  rounded-full">
           <button onClick={() => navigate("/")} className=" hover:text-[#4a6d47] cursor-pointer">
             Головна
           </button>
           <button onClick={() => navigate("/Catalog")} className=" hover:text-[#41583e] cursor-pointer">
             Як зробити замовлення?
           </button>
           <button onClick={() => navigate("/Catalog")} className=" hover:text-[#41583e] cursor-pointer">
             Доставка і оплата
           </button>
           <button onClick={() => navigate("/Catalog")} className=" hover:text-[#41583e] cursor-pointer">
             Контакти
           </button>
        </div>

      {/* search */}
      <input
        type="text"
        placeholder="Пошук..."
        className="w-60 -mr-17 px-4 py-2 border rounded-full text-sm outline-none"
      />

      {/* icons */}
      <div className="flex gap-6 text-xl">
        <button className="cursor-pointer">
            <img src={heartIcon} alt="favorites" className="w-5 h-5" />
        </button>
         <button className="cursor-pointer">
            <img src={shopIcon} alt="shop" className="w-5 h-5" />
        </button>
         <button className="cursor-pointer">
            <img src={profilIcon} alt="profil" className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
