import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCarBattery } from "react-icons/fa";
import { useTheme } from "../../shared/ThemeContext";
import { RiSignalWifiErrorFill } from "react-icons/ri";

import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Accumulators = () => {
  const { t } = useTranslation();
  const { dark } = useTheme();

  const [loading, setLoading] = useState(true);
  const [accumulators, setAccumulators] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const addProductToCart = (product) => {
    const local = JSON.parse(localStorage.getItem("products")) || []

    const index = local.findIndex(
      item => item.id === product.id &&
      item.name === product.name
    )

    let newCart = [...local]

    if (index !== -1) {
      newCart[index] = {
        ...newCart[index], count: newCart[index].count + 1
      }
    }else {
      newCart.push({...product, count: 1,nameProduct: "accumulator", cartID: crypto.randomUUID() })
    }
    localStorage.setItem("products", JSON.stringify(newCart))
    navigate("/cart")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      async function products() {
        try {
          const response = await axios.get(`${API_URL}/accumulators`);
          setAccumulators(response.data);
          console.log(response.status);
        } catch (error) {
          if (error.response) {
            setError(error.response.status);
          } else {
            setError("ERROR");
          }
        } finally {
          setLoading(false);
        }
      }
      products();
    }, 1000);
    return () => clearTimeout(timer);
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
        className={`${
          dark ? "bg-stone-950 text-white " : "bg-stone-950"
        }flex justify-center items-center h-[100vh] flex gap-5`}
      >
        <div className="text-[60px]">ERROR 404</div>
        <div className="text-[60px]">
          <RiSignalWifiErrorFill />
        </div>
      </div>
    );
  }

  if (accumulators) {
    return (
      <div
        className={`w-full ${
          dark
            ? "bg-gradient-to-r from-black via-blue-900 to-black"
            : "bg-white"
        }`}
      >
        <header className="bg-gradient-to-r from-sky-950 via-blue-800 to-sky-950 w-full flex justify-center items-center gap-2 p-3 flex-col">
          <p className="text-[50px] text-white font-bold">CONNECTIVITY</p>
          <div className="text-[50px] text-white">
            <FaCarBattery />
          </div>
        </header>

        <div className="grid grid-cols-3 p-10 gap-40">
          {accumulators.map((prod) => {
            return (
              <div
                key={prod.id}
                className={`${
                  dark ? "bg-gray-900 text-white" : "bg-stone-200 text-black"
                }  h-[600px] shadow-xl/30 rounded-lg p-5 grid grid-rows-10`}
              >
                <div className="row-start-1 row-end-6 rounded-xl flex justify-center bg-white">
                  <img
                    src={prod.images?.[0].img}
                    className="object-contain w-50 "
                  />
                </div>

                <div className="row-start-6 row-end-9 p-2 grid gap-3">
                  <p className="text-[20px] font-bold">{prod.name}</p>
                  <p>
                    {t(prod.descriptionKey).slice(0, 100)}...
                    <Link
                      className="font-bold text-green-600"
                      to={`/accumulator/${prod.id}`}
                    >
                      {t("seeMore", "see more")}
                    </Link>
                  </p>
                </div>

                <div className="row-start-9 row-end-10 text-[30px] text-blue-600 font-bold flex justify-between ">
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

                <div className="flex justify-center items-center">
                  <Link
                    to={`/accumulator/${prod.id}`}
                    className="border-2 p-3 rounded-full w-[100px] font-bold cursor-pointer hover:scale-120 active:scale-100 duration-60 flex justify-center items-center"
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

export default Accumulators;
