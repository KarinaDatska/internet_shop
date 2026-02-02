import Photo from "../assets/Free_delivery.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
   const navigate = useNavigate();

  return (
    <section className="flex items-center justify-around">

      <div className="relative w-7xl h-135 right-50 mt-10 bg-[#678b64] hover:bg-[#41583e] rounded-full flex items-center justify-center">
        <p className="flex flex-col place-items-center left-5 text-4xl font-mono text-white tracking-wides ">
          <span>З</span>
          <span>А</span>
          <span>М</span>
          <span>О</span>
          <span>В</span>
          <span>Л</span>
          <span>Я</span>
          <span>Й</span>
        </p>
        <img src={Photo} alt="photo" className="absolute w-55 h-110 -right-10 "/>
      </div>

      <div className="w-600 -mt-5 -ml-7">
        <h1 className="text-4xl font-light leading-tight mb-5 mt-20 ">
          Надійні пакувальні рішення для вашого бізнесу <br/> Коли важлива кожна деталь
        </h1>

        <button onClick={() => navigate("/Catalog")} className="px-7 py-2.5 cursor-pointer  bg-[#678b64] text-white rounded-full hover:bg-[#41583e]">
          Перейти в каталог
        </button>

        {/* Переваги */}
        <div className=" mt-20 flex items-center justify-between gap-5">
          <h2 className=" text-3xl font-light mr-3">
            Чому <br/> обирають <br/> нас?
        </h2>
        <div>
          <div className="ml-1.5 mb-1.5 w-6 h-6 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-xs"> 1 </div>
          <h3 className="">Надійна упаковка</h3>
          <p className="text-gray-500 text-sm">
            Захист товарів під час зберігання та доставки
          </p>
        </div>
        <div>
           <div className="-mt-6 mb-1.5 w-6 h-6 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-xs"> 2 </div>
          <h3 >Швидке відвантаження</h3>
          <p className="text-gray-500 text-sm">
            Завжди готові до замовлення
          </p>
        </div>
        <div>
            <div className="-mt-6 mb-1.5 w-6 h-6 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-xs"> 3 </div>
          <h3>Гарантована якість</h3>
          <p className="text-gray-500 text-sm">
            Перевірені матеріали та майстри
          </p>
        </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
