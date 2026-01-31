import React from "react";
import Slider from "../../shared/Slider";
import { FaHome } from "react-icons/fa";
import { useTheme } from "../../shared/ThemeContext";

const Home = () => {
  const { dark } = useTheme();

  return (
    <section className={`${dark ? 'bg-gradient-to-t from-blue-950 via-black to-sky-900 text-white' : ' text-black'} min-h-screen`}>
      <div className="w-full flex justify-center items-center ">
        <h1 className="flex gap-6 text-[60px] font-bold items-center">
          HOME
          <FaHome />
        </h1>
      </div>
      <Slider />

      <div className="flex justify-center p-5">
        <h1 className="text-[40px] font-bold">COLLABORATIONS</h1>
      </div>

      <div className="grid grid-cols-6 p-4 gap-[10px]">
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <img
            src="/e119d7b9e07cc058ee7913d1f3ee9882.jpg"
            className="w-[250px] h-[250px] rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-cyan-500/100"
          />
        </div>
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <img
            src="/Maxon-vertical-thumbnail.png"
            className="w-[250px] h-[250px] rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-red-500/100"
          />
        </div>
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <img
            src="/ATL amperex_logo.png"
            className="w-[250px] h-[250px] rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-blue-500/100"
          />
        </div>
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <img
            src="/byd.png"
            className="w-[250px] h-[250px] bg-stone-50 rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-red-500/100"
          />
        </div>
        <div className="w-[250px] h-[250px] bg-stone-50 flex justify-center items-center rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-emerald-700/100">
          <img src="/TOTAL-HERRAMIENTAS-Logo-Vector.svg-.png" className="w-[200px]" />
        </div>
        <div className="w-[250px] h-[250px] bg-stone-50 flex justify-center items-center rounded-[30px] cursor-pointer hover:-translate-2 hover:shadow-xl duration-500 shadow-red-600/100">
          <img src="/makita logo.png" className="w-[200px]" />
        </div>
      </div>
    </section>
  );
};

export default Home;
