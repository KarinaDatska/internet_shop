import shopIcon from "../assets/shopping-cart.png";
import phoneIcon from "../assets/phone.png";
import chatIcon from "../assets/chat.png";
import checkIcon from "../assets/check.png";
import { Link } from "react-router-dom";

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
        "Після чого Вам зателефонує менеджер впродовж пів години",
      ],
    },
    {
      title: "По телефону",
      icon: phoneIcon,
      list: [
        "Зателефонуйте за номером",
        <span key="phone-contact">
          Перейдіть на сторінку{" "}
          <Link
            to="/Contacts"
            className="text-[#678b64] underline"
          >
            Контакти
          </Link>{" "}
          і оберіть зручний для Вас варіант
        </span>,
        "Повідомте менеджеру потрібний товар",
        "Підтвердіть деталі замовлення",
      ],
    },
    {
      title: "Через месенджери",
      icon: chatIcon,
      list: [
        "Напишіть нам у Viber, WhatsApp, Instagram, Telegram",
        <span key="messenger-contact">
          Перейдіть на сторінку{" "}
          <Link
            to="/Contacts"
            className="text-[#678b64] underline"
          >
            Контакти
          </Link>{" "}
          і оберіть зручний для Вас варіант
        </span>,
        "Отримайте консультацію",
        "Підтвердіть замовлення",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-center text-[#678b64] uppercase tracking-wide sm:tracking-widest text-2xl sm:text-3xl lg:text-[30px] font-sans mb-8 sm:mb-10 leading-tight">
        Не знаєте як зробити замовлення?
        <br />
        <span className="text-black font-semibold">
          Ми Вам допоможемо!
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300"
          >
            {/* Іконка */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-full bg-[#f3f7f2] flex items-center justify-center">
              <img
                src={step.icon}
                alt={step.title}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* Назва */}
            <h2 className="text-center text-base sm:text-lg font-semibold text-[#678b64] uppercase tracking-wide mb-5 sm:mb-6">
              {step.title}
            </h2>

            {/* Кроки */}
            <ul className="space-y-3 sm:space-y-4">
              {step.list.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                >
                  <img
                    src={checkIcon}
                    alt="check"
                    className="w-4 h-4 mt-1 shrink-0"
                  />

                  <span className="text-sm sm:text-[15px] text-gray-600 leading-relaxed wrap-break-word">
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