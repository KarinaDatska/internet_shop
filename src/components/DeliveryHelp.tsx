const DeliveryPayment = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* Title */}
      <h1 className="text-center text-[#678b64] uppercase tracking-widest 
                     text-2xl sm:text-3xl lg:text-4xl mb-10 sm:mb-12">
        Доставка та Оплата
      </h1>

      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        {/* LEFT — PAYMENT */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-[#e5e5e5]
                        shadow-neutral-600 hover:shadow-lg transition-all duration-300">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#678b64] mb-5 sm:mb-6">
            Оплата
          </h2>

          <p className="text-gray-800 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
            Ви обираєте товар, додаєте в кошик і оформлюєте замовлення.
            Після цього менеджер зв’яжеться з вами для підтвердження замовлення.
          </p>

          <div className="bg-[#e1efde] italic px-4 sm:px-5 py-5 sm:py-6 rounded-xl text-gray-800 text-xs sm:text-sm space-y-2">
            <p className="mb-2.5">✓ Оплата можлива після підтвердження замовлення</p>
            <p className="mb-2.5">✓ На банківську карту</p>
            <p className="mb-2.5">✓ Готівкою при отриманні</p>
          </div>

        </div>

        {/* RIGHT — DELIVERY */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-[#e5e5e5]
                        shadow-neutral-600 hover:shadow-lg transition-all duration-300">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#678b64] mb-5 sm:mb-6">
            Доставка
          </h2>

          {/* 1 */}
          <div className="mb-6 sm:mb-8">
            <p className="text-gray-700 mb-3 text-sm sm:text-base">
              <span className="text-xl italic sm:text-2xl font-bold text-[#678b64] mr-2">1.</span>
              Безкоштовна доставка по містах:
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 ml-0 sm:ml-6">
              {["Рівне", "Костопіль", "Березне", "Луцьк"].map((city) => (
                <span
                  key={city}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#e1efde] text-gray-700 text-xs sm:text-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* 2 */}
          <div className="mb-5 sm:mb-8">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="text-xl italic sm:text-2xl font-bold text-[#678b64] mr-2">2.</span>
              Шукаємо попутні машини для доставки
            </p>
          </div>

          {/* 3 */}
          <div>
            <p className="text-gray-700 mb-3 text-sm sm:text-base">
              <span className="text-xl italic sm:text-2xl font-bold text-[#678b64] mr-2">3.</span>
              Через перевізників:
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 ml-0 sm:ml-6">
              {[
                "Нова Пошта",
                "Укрпошта",
                "Міст Пошта",
                "Делівері",
                "SAT",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#e1efde] text-gray-700 text-xs sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeliveryPayment;