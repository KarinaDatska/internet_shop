import { useNavigate } from "react-router-dom";
import fonPhoto from "../assets/fon.png";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 flex items-center ">

      {/* Background image */}
      <img
        src={fonPhoto}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent"></div>

      {/* Content wrapper */}
      <div className="relative max-w-7xl mx-auto px-3 w-full">

        <div className="max-w-3xl">

          {/* Glass card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/5 shadow-3xl rounded-3xl p-5 md:p-12 ">

            {/* Top text */}
            <span className=" text-[#9fc69c] uppercase tracking-[0.25em] text-xs font-semibold">
              Пакувальні рішення
            </span>

            <h1 className="text-[49px] md:text-6xl font-bold text-white leading-tight">
              Все для вашого бізнесу <br />
              <span className="text-[#9fc69c] -mt-10 text-[45px]">
                коли важлива кожна деталь
              </span>
            </h1>

            <div className="w-20 h-2px bg-[#9fc69c] rounded-full mt-5" />

            <p className="mt-8 text-gray-200 max-w-lg text-base md:text-lg leading-relaxed">
              Скоч, стрейч, пакети, плівки та інші рішення для стабільної доставки вашого бізнесу
            </p>

            <button
              onClick={() => navigate("/Catalog")}
              className="mt-16 px-8 py-4 bg-[#678b64] hover:bg-[#41583e] text-white rounded-full transition-all duration-300 shadow-lg hover:scale-105"
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Hero;
