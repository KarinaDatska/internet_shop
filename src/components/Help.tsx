import shopIcon from "../assets/shopping-cart.png";
import phoneIcon from "../assets/phone.png";
import chatIcon from "../assets/chat.png";
import checkIcon from "../assets/check.png";

const Help = () => {
  const steps = [
    {
      title: "Через сайт",
      icon: shopIcon,
      list: [
        "Оберіть товар у каталозі",
        "Додайте товар у кошик",
        "Перейдіть до оформлення замовлення",
        "Підтвердіть замовлення",
        "Після чого Вам зателефонує менеджер впровж пів години"
      ],
    },
    {
      title: "По телефону",
      icon: phoneIcon,
      list: [
        "Зателефонуйте за номером",
        "Перейдійть на сторінку 'Контакти' і оберіть зручний для Вас варіант",
        "Повідомте менеджеру потрібний товар",
        "Підтвердіть деталі замовлення",
      ],
    },
    {
      title: "Через месенджери",
      icon: chatIcon,
      list: [
        "Напишіть нам у Viber, WhatsApp, Instagram, Telegram",
        "Перейдійть на сторінку 'Контакти' і оберіть зручний для Вас варіант",
        "Отримайте консультацію",
        "Підтвердіть замовлення",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-center text-[#678b64] uppercase tracking-widest text-[30px] font-sans mb-10">
        Не знаєте як зробити замовлення?<br/><span className="text-black font-semibold">Ми Вам допоможемо!</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-[#e5e5e5] p-8 shadow-neutral-600
                       hover:shadow-lg transition-all duration-300"
          >
            {/* Іконка способу */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f3f7f2] flex items-center justify-center">
              <img
                src={step.icon}
                alt={step.title}
                className="w-10 h-10"
              />
            </div>

            {/* Назва */}
            <h2 className="text-center text-lg font-semibold text-[#678b64] uppercase tracking-wide mb-6">
              {step.title}
            </h2>

            {/* Список кроків */}
            <ul className="space-y-4">
              {step.list.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <img
                    src={checkIcon}
                    alt="check"
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Help;
