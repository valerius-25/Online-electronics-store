import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";
import { RiSignalWifiErrorFill } from "react-icons/ri";

const API_URL = import.meta.env.VITE_API_URL;

function ConnectivityDetails() {
  const [products, setProducts] = useState(null);
  const [loading, setLoding] = useState(true);
  const { t } = useTranslation();
  const { dark } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const found = res.data.connectivity.find(
          (item) => item.id === Number(id)
        );
        setProducts(found || null);
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

  if (products) {
    return (
      <div
        className={` flex justify-center p-5 ${
          dark ? "bg-gray-950" : "bg-white"
        } `}
      >
        <div
          className={`w-full sm:w-[80%] flex flex-col gap-5 p-3 sm:p-5 ${
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
          <div className="p-2 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div className="p-3 flex flex-col sm:flex-row justify-between gap-2 border-b-2 border-stone-300">
                  <samp className="font-bold text-sm sm:text-xl text-gray-700">
                    {t(param.nameKey)}
                  </samp>
                  <samp className="inline-block px-3 py-1 bg-blue-100 rounded-lg text-blue-600 font-bold text-sm sm:text-base">
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

export default ConnectivityDetails;
