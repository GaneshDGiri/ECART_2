import { faker } from "@faker-js/faker";
import Header from "./Header";
import Aside from "./Aside";
import Arrow from "./assets/Arrow.png";
import { ContextData } from "./Context";
import { useContext } from "react";
import Trash from "./assets/trash.svg";
import Login from "./Login";
import Signup from "./Signup";

// --- Generate Data Once ---
const data = [];
faker.seed(123);
for (let i = 0; i < 20; i++) {
  data.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.food(200, 200, true),
    stock: Math.floor(Math.random() * 3 + 1),
    delivery: Math.floor(Math.random() * 3 + 1),
    id: i,
  });
}

const Home = () => {
  const { cartData, setCartData, button, currentPage } = useContext(ContextData);

  // --- Filter Logic ---
  let DefaultArray = data.filter((i) => i.stock > 1);
  let displayData;

  const sortByPrice = (arr, ascending = true) =>
    arr.sort((i, j) => (ascending ? Number(i.price) - Number(j.price) : Number(j.price) - Number(i.price)));

  if (button.Ascending) {
    displayData = sortByPrice(button.Stock ? data : DefaultArray, true);
  } else if (button.Descending) {
    displayData = sortByPrice(button.Stock ? data : DefaultArray, false);
  } else if (button.Stock && button.Delivery) {
    displayData = data.filter((i) => i.delivery < 2);
  } else if (button.Stock) {
    displayData = data;
  } else if (button.Delivery) {
    displayData = DefaultArray.filter((i) => i.delivery < 2);
  } else {
    displayData = DefaultArray;
  }

  // --- NEW: Handle Checkout Function ---
  const handleCheckout = () => {
    if (cartData.length === 0) return;
    alert("Order is complete!"); // Show success message
    setCartData([]); // Empty the cart
    // Buttons on the main page will automatically reset because they listen to cartData state now
  };

  return (
    <div>
      <Header />

      {/* --- VIEW: HOME PAGE --- */}
      {currentPage === "home" && (
        <>
          {/* Cart Overlay */}
          <div
            className={`${
              button.CartClick
                ? "block visible absolute right-2 md:right-12 top-16 md:px-4 bg-slate-100 min-h-fit max-h-[30rem] overflow-scroll w-[22rem] md:w-[28rem] z-10 rounded-3xl shadow-xl border-2 border-slate-300"
                : "hidden"
            }`}
          >
            <ul>
              {cartData.map((item) => (
                <li key={item.id} className="flex justify-between items-center mx-2 my-5 border-b border-slate-300 pb-2">
                  <img
                    className="outline-offset-4 outline-4 outline-double outline-emerald-700 rounded-full w-20"
                    src={item.image}
                    alt=""
                  />
                  <span className="grid">
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    <span className="text-gray-600 font-semibold">${item.price}</span>
                  </span>
                  <img
                    className="w-6 cursor-pointer hover:scale-110 transition"
                    src={Trash}
                    alt="Trash"
                    onClick={() => setCartData(cartData.filter((i) => i.id !== item.id))}
                  />
                </li>
              ))}
            </ul>

            {cartData.length === 0 ? (
              <div className="text-2xl font-semibold text-center py-10 text-slate-900">Cart Is Empty !!!</div>
            ) : (
              // --- NEW: Checkout Button ---
              <div className="flex justify-center pb-5 pt-2">
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full text-xl transition shadow-md"
                >
                  Complete Order
                </button>
              </div>
            )}
          </div>

          <Aside />

          <main className="absolute top-20 left-40 w-fit h-fit text-center ml-4 mt-2">
            <ul className="grid gap-3 md:gap-6 md:grid-cols-4 md:ml-60">
              {displayData.map((i) => {
                // Check if this specific item is already in the cart
                const isInCart = cartData.some((cartItem) => cartItem.id === i.id);

                return (
                  <li key={i.id} className="grid border-black border-2 rounded-md p-2 bg-white">
                    <img className="rounded-md ml-[.20rem] mt-[.20rem]" src={i.image} alt="" />
                    <span className="font-semibold text-gray-800 mt-2">{i.name}</span>
                    <span className="font-bold text-zinc-700">${i.price}</span>
                    <span className="text-neutral-800 font-semibold mb-2">
                      {i.delivery > 1 ? "4 Days Delivery" : "Fast delivery"}
                    </span>

                    {/* Logic for Stock and Buttons */}
                    {i.stock > 1 ? (
                      // Render button based on Cart State (React way) instead of DOM manipulation
                      isInCart ? (
                        <button
                          disabled
                          className="w-fit mx-auto px-4 rounded-md text-zinc-300 py-1 font-semibold mb-[.20rem] bg-gray-500 cursor-not-allowed"
                        >
                          Go To Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => setCartData([...cartData, i])}
                          className="w-fit mx-auto px-4 rounded-md text-white py-1 font-semibold mb-[.20rem] bg-green-600 hover:bg-green-700 transition"
                        >
                          Place Order
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="bg-blue-500 w-fit mx-auto px-4 rounded-md text-zinc-300 py-1 font-semibold mb-[.20rem] cursor-not-allowed"
                      >
                        Out Of Stock
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </main>

          {/* Scroll to top */}
          <aside
            className="fixed bottom-10 md:bottom-5 left-10 md:left-10 cursor-pointer"
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <img className="w-14 bg-slate-600 rounded-full hover:bg-slate-800 transition" src={Arrow} alt="Scroll Up" />
          </aside>
        </>
      )}

      {/* --- VIEW: LOGIN PAGE --- */}
      {currentPage === "login" && <Login />}

      {/* --- VIEW: SIGNUP PAGE --- */}
      {currentPage === "signup" && <Signup />}
    </div>
  );
};

export default Home;

