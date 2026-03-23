import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../shared/ThemeContext";
import { useTranslation } from "react-i18next";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { ImPower } from "react-icons/im";
import { Link } from "react-router-dom";

import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const power = () => {
  const { t } = useTranslation();
  const { dark } = useTheme();

  const [loading, setLoding] = useState(true);
  const [power, setPower] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const addProductToCart = (product) => {
    const local = JSON.parse(localStorage.getItem("products")) || []
    const index = local.findIndex(item => item.id === product.id && item.name === product.name)
    let newCart = [...local]
    if (index !== -1) {
      newCart[index] = {...newCart[index] , count: newCart[index].count + 1}
    }
    else {
      newCart.push({...product, count: 1, nameProduct: "power", cartID: crypto.randomUUID()})
    }

    localStorage.setItem("products", JSON.stringify(newCart))
    navigate("/cart")
  }




  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchProducts() {
        try {
          const response = await axios.get(API_URL);
          setPower(response.data.power);
        } catch (error) {
          if (error.response) {
            setError(error.response.data);
          } else {
            setError("internysk");
          }
        } finally {
          setLoding(false);
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

  if (power) {
    return (
      <div
        className={`w-full ${
          dark
            ? "bg-gradient-to-r from-black via-amber-800 to-black"
            : "bg-white"
        }`}
      >
        <header className="bg-amber-600 w-full flex justify-center items-center gap-2 p-3 flex-col">
          <p className="text-[50px] text-white font-bold">POWERS</p>
          <div className="text-[50px] text-white">
            <ImPower />
          </div>
        </header>

        <div className="grid grid-cols-3 p-10 gap-40">
          {power.map((powers) => {
            return (
              <div
                key={powers.id}
                className={`${
                  dark ? "bg-gray-900 text-white" : "bg-stone-200 text-black"
                } w-[400px] h-[600px] shadow-xl/30 p-5 rounded-lg grid grid-rows-10`}
              >
                <div className=" row-start-1 row-end-6 bg-white rounded-xl p-5 flex justify-center items-center">
                  <img
                    src={powers.images?.[0].img}
                    className="object-contain w-65"
                  />
                </div>
                <div className="row-start-6 row-end-9 p-2 grid gap-3">
                  <p className="text-[20px] font-bold">{powers.name}</p>
                  <p>
                    {t(powers.descriptionKey).slice(0, 100)}...
                    <Link
                      className="text-green-600 font-bold cursor-pointer"
                      to={`/power/${powers.id}`}
                    >
                      {t("seeMore", "see mor")}
                    </Link>
                  </p>
                </div>
                <div className=" flex justify-between row-start-9 row-end-10 text-[30px] text-blue-600 font-bold">
                  $ {powers.price}
                  <Link 
                  to="/cart"
                  onClick={() => addProductToCart(powers)}
                  className={`${dark ? "text-white" : "text-black"} cursor-pointer active:scale-90`}
                  >
                    < FaCartShopping />
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <Link to={`/power/${powers.id}`} className="border-2 p-3 rounded-full w-[100px] font-bold cursor-pointer hover:scale-120 active:scale-100 duration-60 flex justify-center itmes-center  ">
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

export default power;
