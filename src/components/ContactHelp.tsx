import phoneIcon from "../assets/phone.png";
import chatIcon from "../assets/chat.png";
import locationIcon from "../assets/location.png";
import emailIcon from "../assets/email.png";
import instagramIcon from "../assets/instagram.png";
import viberIcon from "../assets/viber.png"
import facebookIcon from "../assets/facebook.png";

const ContactHelp = () => {
  const contacts = [
    {
      title: "Телефони",
      icon: phoneIcon,
      value1: "+380 50 049 74 23",
      value2: "+380 63 033 01 08",
      value3: "+380 68 663 63 99",
      desc: "Працюємо щодня",
    },
    {
      title: "Месенджери",
      icon: chatIcon,
      value1: "+380 50 049 74 23 - Viber",
      value2: "+380 68 663 63 99 - Telegram",
      value3: "+380 63 033 01 08 - WhatsApp",
      desc: "Швидка відповідь протягом 30 хв",
    },
    {
      title: "Адреса",
      icon: locationIcon,
      value1: "м. Рівне, вул. Замкова 21",
      desc: "Для самовивоза попереджайте!",
    },
    {
      title: "Email",
      icon: emailIcon,
      value1: "profpak2020@gmail.com",
      desc: "Для співпраці та запитів",
    },
  ];

  const socials = [
    {
      name: "Instagram",
      icon: instagramIcon,
      link: "https://www.instagram.com/materialu_pakyvalni?igsh=YzV5NXpjZDZuNGsz&utm_source=qr",
    },
    {
      name: "Viber",
      icon: viberIcon,
      link: "https://invite.viber.com/?g2=AQATEBuEQTzCnktZVHZefX0KCsF0aH9Z7Uk3irqBNshiR8fm8Kn2WK3rMv26ZbN4",
    },
    {
      name: "Facebook",
      icon: facebookIcon,
      link: "https://www.facebook.com/share/g/18tMciaMEg/",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Заголовок */}
      <h1 className="text-center text-[#678b64] uppercase tracking-widest text-[22px] sm:text-[26px] lg:text-[30px] mb-10 sm:mb-12">
        Контакти <br />
        <span className="text-black font-semibold text-base sm:text-lg lg:text-xl">
          Зв’яжіться з нами зручним способом
        </span>
      </h1>

      {/* Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mb-10">
        {contacts.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-[#e5e5e5] px-6 sm:px-7 py-6 sm:py-7 shadow-neutral-600
                       hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-full bg-[#f3f7f2] flex items-center justify-center">
              <img src={item.icon} alt={item.title} className="w-8 sm:w-9 h-7 sm:h-8" />
            </div>

            <h2 className="text-base sm:text-lg font-semibold text-[#678b64] mb-2 sm:mb-3 text-center">
              {item.title}
            </h2>

            <p className="text-gray-800 font-medium text-sm sm:text-base text-center">{item.value1}</p>
            <p className="text-gray-800 font-medium text-sm sm:text-base text-center">{item.value2}</p>
            <p className="text-gray-800 font-medium text-sm sm:text-base text-center">{item.value3}</p>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-5 mb-3 text-center">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Socials */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-30 mt-6 text-center lg:text-left">

        {/* Text */}
        <div>
          <p className="text-[#678b64] uppercase tracking-widest text-[16px] sm:text-[18px] lg:text-[20px]">
            Знаходьте нас <br />
            <span className="text-black font-semibold text-sm sm:text-base lg:text-lg">
              в соціальних мережах
            </span>
          </p>
        </div>

        {/* Icons */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-13">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 sm:gap-3 group"
            >
              <div
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#f3f7f2]
          flex items-center justify-center
          group-hover:scale-110 transition"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-6 sm:w-7 h-6 sm:h-7"
                />
              </div>

              <span className="text-xs sm:text-sm text-gray-700 group-hover:text-[#678b64]">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactHelp;