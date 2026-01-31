import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";
import { RiSignalWifiErrorFill } from "react-icons/ri";



  // {----------------------------------------------------------------------------------------------------------------}

import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";

  // {----------------------------------------------------------------------------------------------------------------}


const API_URL = import.meta.env.VITE_API_URL;

function ArduinoDetails() {
  const [products, setProducts] = useState(null);
  const [loading, setLoding] = useState(true);
  const { t } = useTranslation();
  const { dark } = useTheme();
  const { id } = useParams();

  // {----------------------------------------------------------------------------------------------------------------}

  const [count, setCount] = useState(1);
  const [countP, setCountP] = useState(0);
  const [countT, setCountT] = useState(0);
  // {----------------------------------------------------------------------------------------------------------------}


  useEffect(() => {
    axios
      .get(`${API_URL}/arduino/${id}`)
      .then((res) => {
        setProducts(res.data);
        setCountP(res.data.price);
        setCountT(res.data.price);
      })
      .catch(() => setProducts(null))
      .finally(() => setLoding(false));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-5">
        <div className="border-15 w-40 h-40 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[30px] font-bold">{t("loading", "loading...")}</p>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <h1 className="text-[50px] flex gap-5 font-bold text-red-600">
          ERROR <RiSignalWifiErrorFill />
        </h1>
      </div>
    );
  }

  // {----------------------------------------------------------------------------------------------------------------}
  const minus = () => {
    if (count === 1) {
      return;
    }

    const newC = count - 1;
    setCount(newC);
    setCountT(newC * countP);
  };

  const plus = () => {
    const newC = count + 1;
    setCount(newC);
    setCountT(newC * countP);
  };

  // {----------------------------------------------------------------------------------------------------------------}

  if (products) {
    return (
      <div
        className={` flex justify-center items-center p-5 ${
          dark ? "bg-gray-950" : "bg-white"
        } `}
      >
        <div
          className={`w-[80%] flex flex-col gap-5 p-5 ${
            dark ? "bg-slate-900" : "bg-slate-200"
          }`}
        >
          <h1
            className={`text-[30px] font-bold ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {products.name}
          </h1>
          <p className={`text-[20px] ${dark ? "text-white" : "text-black"}`}>
            {t(products.descriptionKey)}
          </p>
          <div className="flex justify-between ">
            <h1 className="text-[30px] text-green-600 font-bold">
              ${products.price}
            </h1>
            <div className="p-2 w-[60px] flex justify-center bg-white rounded-full text-stone-700">
              ID: {products.id}
            </div>
          </div>

          {/* // {----------------------------------------------------------------------------------------------------------------} */}

          <div className=" border-stone-700 flex items-center justify-center p-2">
            <div className="flex justify-between w-200">
              <div className="flex gap-2">
                <button
                  onClick={minus}
                  className="text-[50px] bg-red-600 text-white rounded-full  cursor-pointer active:scale-90"
                >
                  <CiCircleMinus />
                </button>

                <div className=" w-20 text-center text-xl font-bold flex justify-center bg-white items-center border-1 border-stone-400 rounded-full">
                  {count}
                </div>

                <button
                  onClick={plus}
                  className="text-[50px] bg-blue-600 text-white rounded-full cursor-pointer active:scale-90"
                >
                  <CiCirclePlus />
                </button>
              </div>
              <Link
                to="/buy"
                className="border-2 bg-white cursor-pointer w-50 active:scale-90 flex justify-center items-center rounded-full p-2  gap-5 text-[20px] font-bold"
              >
                {" "}
                <p>
                  <FaCartArrowDown />
                </p>{" "}
                BUY <p>${Math.round(countT)}</p>
              </Link>
            </div>
          </div>
          {/* // {----------------------------------------------------------------------------------------------------------------} */}

          <div className="p-10 grid grid-cols-3 gap-5">
            {products.images?.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-2xl p-5 shadow-lg bg-white"
              >
                <img
                  src={image.img}
                  alt={`houston we have a problem whith image ID: ${image.id}  `}
                  className=" object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className={`rounded-2xl shadow-xl overflow-hidden bg-stone-200`}>
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-5">
              <h2 className="text-2xl font-bold text-white">
                {t("technicalSpecifications", "Technical Specifications")}
              </h2>
            </div>

            <div className="p-6">
              {products.parameters?.map((param) => (
                <div className="p-5 flex justify-between border-b-2 border-stone-300">
                  <samp className="font-bold text-xl text-gray-700 ">
                    {t(param.nameKey)}
                  </samp>
                  <samp className="inline-block px-4 py-2 bg-blue-100 rounded-lg text-blue-600 font-bold">
                    {param.value}
                  </samp>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArduinoDetails;
