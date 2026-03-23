import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsReddit } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiArduino } from "react-icons/si";
import { useTheme } from "./ThemeContext";


const Footer = () => {
  const { t, i18n } = useTranslation();
  const { dark, toggleTheme } = useTheme();

  return (
    <div className={`${dark ? "bg-gradient-to-r from-black via-sky-900 to-black text-white" : "bg-gradient-to-r from-cyan-300 via-sky-700 to-cyan-300 text-white"} p-5 flex flex-col items-center gap-6`}>
      <div className="text-[35px] sm:text-[45px] flex gap-5">
        <a
          target="_blank"
          href=""
          className="hover:scale-110 duration-200"
        >
          <FaFacebook />
        </a>
        <a
          target="_blank"
          href=""
          className="hover:scale-110 duration-200"
        >
          <FaInstagramSquare />
        </a>
        <a
          target="_blank"
          href=""
          className="hover:scale-110 duration-200"
        >
          <BsReddit />
        </a>
        <a
          target="_blank"
          href=""
          className="hover:scale-110 duration-200"
        >
          <BsTelegram />
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.home")} <FaHome />
        </Link>
        <Link
          to="/arduino"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.arduino")} <SiArduino />
        </Link>
        <Link
          to="/accumulators"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.accumulators")}
        </Link>
        <Link
          to="/power"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.power")}
        </Link>
        <Link
          to="/sensorsModules"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.sensorsModules")}
        </Link>
        <Link
          to="/connectivity"
          className="flex items-center gap-1 border-x-2 px-3 py-1 text-[14px] sm:text-[18px] font-bold hover:scale-105 active:scale-100 duration-200"
        >
          {t("navigation.connectivity")}
        </Link>
      </div>
      <p className="text-sm opacity-70">© 2025 Elken</p>
    </div>
  );
};

export default Footer;
