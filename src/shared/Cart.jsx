import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";
import { MdOutlineDelete } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";

function cart() {
  const { dark } = useTheme();
  const { t } = useTranslation();

  const [products, setproducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const ourProd = JSON.parse(localStorage.getItem("products")) || [];
    setproducts(ourProd);
    setTotalCount(ourProd.length);
  }, []);

  const generalDelete = () => {
    localStorage.removeItem("products");
    setproducts([]);
    setTotalCount(0);
  };

  const increase = (cartID) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];

    const newCart = local.map((item) =>
      item.cartID === cartID ? { ...item, count: item.count + 1 } : item
    );

    localStorage.setItem("products", JSON.stringify(newCart));
    setproducts(newCart);
  };

  const decrease = (cartID) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];

    const newCart = local.map((item) =>
      item.cartID === cartID && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );

    localStorage.setItem("products", JSON.stringify(newCart));
    setproducts(newCart);
  };

  const deleteProduct = (cartID) => {
    const cart = JSON.parse(localStorage.getItem("products")) || [];

    const newCart = cart.filter((item) => item.cartID !== cartID);

    localStorage.setItem("products", JSON.stringify(newCart));
    setproducts(newCart);
  };

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <section
      className={`w-full min-h-[100vh] flex flex-col lg:grid lg:grid-cols-3 ${
        dark ? "bg-stone-950" : "bg-stone-100"
      }`}
    >
      <div className="lg:col-start-1 lg:col-end-3 shadow-2xl">
        {products.length === 0 ? (
          <div
            className={`flex justify-center items-center h-[100vh] ${
              dark ? "text-white" : "text-black"
            } text-[200px] `}
          >
            <BsCartX />
          </div>
        ) : (
          <div className="flex flex-col gap-5 p-5 ">
            {products.map((prod) => (
              <div
                key={prod.cartID}
                className="bg-white shadow-2xl rounded-[30px] w-full flex flex-col sm:flex-row justify-between p-4 gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex justify-center">
                    <img
                      src={prod.images?.[0].img}
                      className="w-32 sm:w-40 object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] sm:text-[20px] font-bold">
                      {prod.name}
                    </p>
                    <p className="text-[16px] sm:text-[20px] text-green-600 font-medium">
                      $ {prod.price}
                    </p>
                    <p className="text-xs sm:text-sm">
                      {t(prod.descriptionKey).slice(0, 30)} ...
                      <Link
                        className="text-green-600 font-medium"
                        to={`/${prod.nameProduct}/${prod.id}`}
                      >
                        {" "}
                        {t("navigation.seeMore")}
                      </Link>
                    </p>
                    <p
                      onClick={() => deleteProduct(prod.cartID)}
                      className="text-[30px] text-stone-600 hover:text-red-600  w-8 cursor-pointer active:scale-90"
                    >
                      <MdOutlineDelete />
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => decrease(prod.cartID)}
                      className="w-10 h-10 flex justify-center items-center text-[40px] bg-red-600 text-white rounded-full  cursor-pointer active:scale-90"
                    >
                      <CiCircleMinus />
                    </button>

                    <div className=" w-15 text-center text-xl font-bold flex justify-center bg-white items-center border-1 border-stone-400 rounded-full">
                      {prod.count}
                    </div>

                    <button
                      onClick={() => increase(prod.cartID)}
                      className=" w-10 h-10 flex justify-center items-center text-[40px] bg-blue-600 text-white rounded-full cursor-pointer active:scale-90"
                    >
                      <CiCirclePlus />
                    </button>
                  </div>
                  <Link
                    to="/buy"
                    className="border-2 bg-white cursor-pointer w-40 active:scale-90 flex justify-center items-center rounded-full p-2  gap-5 text-[20px] font-bold"
                  >
                    {" "}
                    <p>
                      <FaCartArrowDown />
                    </p>{" "}
                    <p>$ {Math.round(prod.price * prod.count)}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-start p-5 lg:items-start lg:pt-10">
        <div className="shadow-2xl p-6 flex flex-col gap-4 lg:sticky lg:top-10 rounded-2xl bg-white w-full max-w-[300px]">
          <button
            onClick={generalDelete}
            className="flex justify-center gap-3 cursor-pointer hover:text-red-600 font-bold p-2 w-40 rounded-full border"
          >
            {" "}
            remuve{" "}
            <p className="text-[20px]">
              <BsCartX />
            </p>
          </button>
          <p className="text-stone-600 text-[20px]">
            products {totalCount} pcs.
          </p>
          <p className="text-[20px]">
            total price
            <span className="text-green-600 font-bold">
              {" "}
              $ {Math.round(totalPrice)}
            </span>
          </p>
          <Link
            to="/Buy"
            className="border-2 rounded-[20px] w-60 h-12 cursor-pointer active:scale-90 text-[30px] font-bold flex justify-center"
          >
            BUY
          </Link>
        </div>
      </div>
    </section>
  );
}

export default cart;
