import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../shared/ThemeContext";
import { useTranslation } from "react-i18next";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoRadioSharp } from "react-icons/io5";

import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const connectivity = () => {
  const { t } = useTranslation();
  const { dark } = useTheme();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const addProductToCart = (product) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];

    const index = local.findIndex(
      (item) => item.id === product.id && item.name === product.name
    );
    let newCart = [...local];

    if (index !== -1) {
      newCart[index] = {
        ...newCart[index],
        count: newCart[index].count + 1,
      };
    } else {
      newCart.push({
        ...product,
        count: 1,
        nameProduct: "connectivityDetails",
        cartID: crypto.randomUUID(),
      });
    }
    localStorage.setItem("products", JSON.stringify(newCart));
    navigate("/cart");
  };

  useEffect(() => {
    const time = setTimeout(() => {
      async function getProducts() {
        try {
          const res = await axios.get(API_URL);
          setProducts(res.data.connectivity);
        } catch (err) {
          if (err.res) {
            setError(err.res.status);
          } else {
            setError("houston we have a problem");
          }
        } finally {
          setLoading(false);
        }
      }
      getProducts();
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  if (loading) {
    return (
      <div
        className={`w-full h-[100vh] flex justify-center items-center flex-col gap-5 ${
          dark ? "bg-stone-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="border-15 w-40 h-40 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[30px] font-bold">{t("navigation.loading")}</p>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className={`w-full h-[100vh] flex justify-center items-center flex-col gap-5 ${
          dark ? "bg-stone-900 text-white" : "bg-white text-black"
        }`}
      >
        <p className="text-[40px] flex gap-2">
          houston we have a problem <RiSignalWifiErrorFill />
        </p>
      </div>
    );
  }

  if (products) {
    return (
      <div
        className={`w-full ${
          dark ? "bg-gradient-to-r from-black via-sky-800 to-black" : "bg-white"
        }`}
      >
        <header className="bg-gradient-to-r from-slate-950 via-sky-900 to-slate-950 w-full flex justify-center items-center gap-2 p-3 flex-col">
          <p className="text-[40px] sm:text-[25px] text-white font-bold">
            HiLetgo & SunFounder
          </p>
          <div className="text-[40px] sm:text-[25px] text-white">
            <IoRadioSharp />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-12 max-w-[1200px] mx-auto">
          {products.map((prod) => {
            return (
              <div
                key={prod.id}
                className={`${
                  dark ? "bg-gray-900 text-white" : "bg-stone-200 text-black"
                } shadow-xl rounded-lg p-5 flex flex-col gap-4`}
              >
                <div className="rounded-xl flex justify-center bg-white p-3 h-[220px]">
                  <img
                    src={prod.images?.[0].img}
                    className="object-contain h-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[20px] font-bold leading-tight">
                    {prod.name}
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm line-clamp-3">
                      {t(prod.descriptionKey).slice(0, 120)}...
                    </p>
                    <Link
                      className="font-bold text-green-600 text-sm"
                      to={`/connectivityDetails/${prod.id}`}
                    >
                      {t("navigation.seeMore")}
                    </Link>
                  </div>
                </div>

                <div className="text-[24px] text-blue-600 font-bold flex justify-between items-center">
                  $ {prod.price}
                  <Link
                    onClick={() => addProductToCart(prod)}
                    to="/cart"
                    className={`${
                      dark ? "text-white" : "text-black"
                    } cursor-pointer active:scale-90`}
                  >
                    <FaCartShopping />
                  </Link>
                </div>

                <div className="flex justify-center">
                  <Link
                    to="/cart"
                    onClick={() => addProductToCart(prod)}
                    className="border-2 p-3 rounded-full w-[100px] font-bold cursor-pointer hover:scale-110 active:scale-100 duration-150 flex justify-center items-center"
                  >
                    {t("navigation.buy")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default connectivity;
