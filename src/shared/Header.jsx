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
    {
      lng: "en",
      label: "English",
      flag: "https://flagsapi.com/GB/shiny/64.png",
    },
    {
      lng: "ru",
      label: "Russian",
      flag: "https://flagsapi.com/RU/shiny/64.png",
    },
    {
      lng: "am",
      label: "Armenian",
      flag: "https://flagsapi.com/AM/shiny/64.png",
    },
  ];

  const currentLanguage = languages.find((l) => l.lng === i18n.language);

  return (
    <div
      className={`${
        dark
          ? "bg-gradient-to-r from-black via-sky-900 to-black text-white"
          : "bg-gradient-to-r from-cyan-300 via-sky-700 to-cyan-300 text-white"
      } flex gap-[10px] p-[10px] justify-evenly items-center h-[180px] w-full`}
    >
      <div>
        <img
          className="border-stone-950 w-[120px]"
          src="/newGreenLogoWith(4).png"
          alt="logo"
        />
      </div>

      <div className="grid grid-rows-2 grid-cols-4 gap-5">
        <Link
          to="/"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-105 active:scale-100  p-2 text-[20px] font-bold flex gap-2 items-center"
        >
          {t("navigation.home")} <FaHome />
        </Link>
        <Link
          to="/arduino"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-105  active:scale-100 p-2 text-[20px] font-bold flex gap-2 items-center"
        >
          {t("navigation.arduino")}{" "}
          <div>
            <SiArduino />
          </div>
        </Link>
        <Link
          to="/accumulators"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-105 active:scale-100 p-2 text-[20px] font-bold"
        >
          {t("navigation.accumulators")}
        </Link>
        <Link
          to="/power"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-105 active:scale-100 p-2 text-[20px] font-bold"
        >
          {t("navigation.power")}
        </Link>
        <Link
          to="/sensorsModules"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold    col-start-2"
        >
          {t("navigation.sensorsModules")}
        </Link>
        <Link
          to="/connectivity"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold     "
        >
          {t("navigation.connectivity")}
        </Link>
        {/* <Link
          to="/accessories"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold"
        >
          {t("navigation.accessories")}
        </Link>
        <Link
          to="/kits"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold"
        >
          {t("navigation.kits")}
        </Link> */}
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2">
          {currentLanguage && (
            <img
              src={currentLanguage.flag}
              alt={currentLanguage.lng}
              className="w-8 h-8"
            />
          )}

          <select
            className=" rounded px-2 bg-white text-black  "
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l.lng} value={l.lng}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button className="cursor-pointer text-[30px]" onClick={toggleTheme}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
        <Link to="/cart" className="text-[30px]">
          <FaCartShopping />
        </Link>
      </div>
    </div>
  );
};

export default Header;
