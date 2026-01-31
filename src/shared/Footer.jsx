import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsReddit } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiArduino } from "react-icons/si";


const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="bg-gradient-to-r from-cyan-300 via-sky-700 to-cyan-300 text-white p-[10px] bg-stone-950 text-stone-50 flex flex-col items-center gap-[30px] ">
      <div className="text-[40px] flex gap-[20px]">
        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <FaFacebook />
        </a>
        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <FaInstagramSquare />
        </a>
        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <BsReddit />
        </a>
        <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <BsTelegram />
        </a>
      </div>
      <div className="flex gap-6">
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
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold"
        >
          {t("navigation.sensorsModules")}
        </Link>
        <Link
          to="/connectivity"
          className="flex justify-center items-center border-x-2 duration-200 hover:scale-110 active:scale-100 p-2 text-[20px] font-bold"
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
    </div>
  );
};

export default Footer;
