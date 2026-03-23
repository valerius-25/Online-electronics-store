import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../shared/ThemeContext";
import { useTranslation } from "react-i18next";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdOutlineSensors } from "react-icons/md";

import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const sensorsModules = () => {
  const { t } = useTranslation();
  const { dark } = useTheme();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

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
        nameProduct: "sensorsModules",
        cartID: crypto.randomUUID(),
      });
    }
    localStorage.setItem("products", JSON.stringify(newCart));
    navigate("/cart");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchProducts() {
        try {
          const response = await axios.get(API_URL);
          setProduct(response.data.sensorsModules);
        } catch (error) {
          if (error.response) {
            setError(error.response.data);
          } else {
            setError("internysk");
          }
        } finally {
          setLoading(false);
        }
      }
      fetchProducts();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`w-full h-[100vh] flex flex-col gap-10 justify-center items-center ${
          dark ? "bg-stone-950" : "bg-stone-50"
        }`}
      >
        <div
          className={`border-15 w-40 h-40 border-t-transparent ${
            dark ? "border-stone-100" : "border-stone-900"
          } rounded-full animate-spin`}
        ></div>
        <p
          className={`text-[30px] font-bold ${
            dark ? "text-stone-50" : "text-stone-950"
          }`}
        >
          {t("navigation.loading")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${
          dark ? "bg-stone-950 text-white" : "bg-stone-50 text-red-600"
        } flex justify-center items-center h-[100vh] gap-5 text-[60px]`}
      >
        <div>ERROR</div>
        <div>
          <RiSignalWifiErrorFill />
        </div>
        <div>{error}</div>
      </div>
    );
  }

  if (product) {
    return (
      <div
        className={`w-full ${
          dark
            ? "bg-gradient-to-r from-black via-emerald-700 to-black"
            : "bg-white"
        }`}
      >
        <header className=" bg-emerald-700 w-full flex justify-center items-center gap-2 p-3 flex-col">
          <p className="text-[50px] text-white font-bold">ASAIR & Luckylight & Adafruit</p>
          <div className="text-[50px] text-white">
            <MdOutlineSensors />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-12 max-w-[1200px] mx-auto">
          {product.map((prod) => {
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
                  <p className="text-sm h-[60px] overflow-hidden">
                    {t(prod.descriptionKey).slice(0, 120)}...
                    <Link
                      className="font-bold text-green-600"
                      to={`/sensorsModules/${prod.id}`}
                    >
                      {t("seeMore", "see more")}
                    </Link>
                  </p>
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
                    to={`/sensorsModules/${prod.id}`}
                    className="border-2 p-3 rounded-full w-[100px] font-bold cursor-pointer hover:scale-110 active:scale-100 duration-150 flex justify-center items-center"
                  >
                    BUY
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

export default sensorsModules;
