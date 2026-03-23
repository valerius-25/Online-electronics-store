import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa6";
import { SiArduino } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";
import { FaCartShopping } from "react-icons/fa6";


const Header = () => {
  const { dark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const languages = [
    { lng: "en", label: "English", flag: "https://flagsapi.com/GB/shiny/64.png" },
    { lng: "ru", label: "Russian", flag: "https://flagsapi.com/RU/shiny/64.png" },
    { lng: "am", label: "Armenian", flag: "https://flagsapi.com/AM/shiny/64.png" },
  ];

  const currentLanguage = languages.find((l) => l.lng === i18n.language);

  return (
    <div className={`${
      dark
        ? "bg-gradient-to-r from-black via-sky-900 to-black text-white"
        : "bg-gradient-to-r from-cyan-300 via-sky-700 to-cyan-300 text-white"
    } w-full p-3 flex flex-col gap-3`}>
      
      <div className="flex justify-between items-center">
        <img className="w-[80px] sm:w-[100px]" src="/newGreenLogoWith(4).png" alt="logo" />
        
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            {currentLanguage && (
              <img src={currentLanguage.flag} alt={currentLanguage.lng} className="w-6 h-6" />
            )}
            <select
              className="rounded px-2 bg-white text-black text-[45px] sm:text-[30px]"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              {languages.map((l) => (
                <option key={l.lng} value={l.lng}>{l.label}</option>
              ))}
            </select>
          </div>
          <button className="cursor-pointer text-[24px] sm:text-[40px]" onClick={toggleTheme}>
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/cart" className="text-[24px] sm:text-[40px]">
            <FaCartShopping />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Link to="/" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.home")} <FaHome />
        </Link>
        <Link to="/arduino" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.arduino")} <SiArduino />
        </Link>
        <Link to="/accumulators" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.accumulators")}
        </Link>
        <Link to="/power" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.power")}
        </Link>
        <Link to="/sensorsModules" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.sensorsModules")}
        </Link>
        <Link to="/connectivity" className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[25px] font-bold hover:scale-105 active:scale-100 duration-200">
          {t("navigation.connectivity")}
        </Link>
      </div>

    </div>
  );
};

export default Header;