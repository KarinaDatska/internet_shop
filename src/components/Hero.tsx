import Photo from "../assets/Free_delivery.png"; 
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f6f6f4] to-white">

      {/* blur background */}
      <div className="absolute md:block -top-32 -left-32 w-96 h-96 bg-[#678b64]/30 rounded-full blur-3xl" />
      <div className="absolute top-22 right-30 w-120 h-120 bg-[#678b64]/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <span className="inline-block text-[#678b64] uppercase tracking-widest text-xs font-semibold mb-3">
            Пакувальні рішення
          </span>

          <h1 className="text-[44px] font-bold leading-tight text-gray-900">
            Все для вашого бізнесу, <br />
            <span className="text-[#678b64]">коли важлива кожна деталь</span>
          </h1>

          <div className="w-16 h-1 bg-[#678b64] rounded-full mt-6" />

          <p className="text-gray-500 mt-6 max-w-md text-lg">
            Скоч, стрейч, пакети, плівки та інші рішення для стабільної доставки вашого бізнесу
          </p>

          <button
            onClick={() => navigate("/Catalog")}
            className="mt-6 px-6 py-3 bg-[#678b64] text-white rounded-full hover:bg-[#41583e] transition-colors"
          >
            Перейти в каталог
          </button>

          {/* ADVANTAGES */}
          <div className="mt-12">
            {/* Заголовок */}
            <h2 className="text-3xl font-light text-gray-900 text-center lg:text-left mb-8">
              Чому обирають нас?
            </h2>

            {/* Блок переваг */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto lg:mx-0 text-center sm:text-left">
              {/* Перевага 1 */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-8 h-8 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="mt-2 font-medium">Надійна упаковка</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Захист товарів під час зберігання та доставки
                </p>
              </div>

              {/* Перевага 2 */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-8 h-8 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="mt-2 font-medium">Швидке відвантаження</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Завжди готові до замовлення
                </p>
              </div>

              {/* Перевага 3 */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-8 h-8 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="mt-2 font-medium">Гарантована якість</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Перевірені матеріали та майстри
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative flex justify-center lg:justify-end">
          {/* картинка зникає <1024px */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-[#678b64]/10 rounded-full blur-2xl scale-90" />
            <img
              src={Photo}
              alt="delivery"
              className="relative w-[260px] drop-shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
