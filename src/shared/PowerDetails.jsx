import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";

import { RiSignalWifiErrorFill } from "react-icons/ri";


const API_URL = import.meta.env.VITE_API_URL;

function PowerDetails() {
  const [power, setPower] = useState(null);
  const [loading, setLoding] = useState(true);
  const { t } = useTranslation();
  const { dark } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    axios
    .get(API_URL)
    .then((res) => {
      const found = res.data.power.find((item) => item.id === Number(id));
      setPower(found || null);
    })
    .catch(() => setPower(null))
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

    if (!power) {
      return (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <h1 className="text-[50px] flex gap-5 font-bold text-red-600">
            ERROR <RiSignalWifiErrorFill />
          </h1>
        </div>
      );
    }

    if (power) {
        return (
          <div
            className={` flex justify-center p-5 ${
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
                {power.name}
              </h1>
              <p className={`text-[20px] ${dark ? "text-white" : "text-black"}`}>
                {t(power.descriptionKey)}
              </p>
              <div className="flex justify-between ">
                <h1 className="text-[30px] text-green-600 font-bold">
                  ${power.price}
                </h1>
                <div className="p-2 w-[60px] flex justify-center bg-white rounded-full text-stone-700">
                  ID: {power.id}
                </div>
              </div>
              <div className="p-10 grid grid-cols-3 gap-5">
                {power.images?.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl shadow-lg bg-white"
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
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-5">
                  <h2 className="text-2xl font-bold text-white">
                    {t("technicalSpecifications", "Technical Specifications")}
                  </h2>
                </div>
    
                <div className="p-6">
                  {power.parameters?.map((param) => (
                    <div className="p-5 flex justify-between border-b-2 border-stone-300">
                      <samp className="font-bold text-xl text-gray-700 ">{t(param.nameKey)}</samp>
                      <samp className="inline-block px-4 py-2 bg-orange-100 rounded-lg text-orange-600 font-bold">{param.value}</samp>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default PowerDetails;
