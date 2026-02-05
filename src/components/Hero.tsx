import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f6f6f4] to-white">

      <div className="relative max-w-7xl mx-auto px-6 py-5 grid lg:grid-cols-2 gap-12 items-center">

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
          <div className="mt-10">
            <h2 className="text-3xl font-light text-gray-900 text-center lg:text-left mb-8">
              Чому обирають нас?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto lg:mx-0 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-8 h-8 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="mt-2 font-medium">Надійна упаковка</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Захист товарів під час зберігання та доставки
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-8 h-8 rounded-full bg-[#7ca17a] text-white flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="mt-2 font-medium">Швидке відвантаження</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Завжди готові до замовлення
                </p>
              </div>
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

        
  

      </div>
    </div>
  );
};

export default Hero;
