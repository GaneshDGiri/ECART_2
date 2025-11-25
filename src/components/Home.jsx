import { faker } from "@faker-js/faker";
import Header from "./Header";
import Aside from "./Aside";
import Arrow from "./assets/Arrow.png";
import { ContextData } from "./Context";
import { useContext } from "react";
import Trash from "./assets/trash.svg";
import Login from "./Login";
import Signup from "./Signup";
import Checkout from "./Checkout"; // <-- new import

// --- Generate Data Once ---
const data = [];
faker.seed(123);
for (let i = 0; i < 100; i++) {
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
  const { cartData, setCartData, button, currentPage, setCurrentPage } = useContext(ContextData);

  // --- Filter Logic ---
  let DefaultArray = data.filter((i) => i.stock > 1);
  let displayData;

  const sortByPrice = (arr, ascending = true) =>
    arr.sort((i, j) => (ascending ? Number(i.price) - Number(j.price) : Number(j.price) - Number(i.price)));

  // 1. Determine base data based on buttons
  if (button.Ascending) {
    displayData = sortByPrice(button.Stock ? [...data] : [...DefaultArray], true);
  } else if (button.Descending) {
    displayData = sortByPrice(button.Stock ? [...data] : [...DefaultArray], false);
  } else if (button.Stock && button.Delivery) {
    displayData = data.filter((i) => i.delivery < 2);
  } else if (button.Stock) {
    displayData = data;
  } else if (button.Delivery) {
    displayData = DefaultArray.filter((i) => i.delivery < 2);
  } else {
    displayData = DefaultArray;
  }

  // 2. Apply Search Filter
  if (button.SearchBar && button.SearchBar.length > 0) {
    displayData = displayData.filter((item) =>
      item.name.toLowerCase().includes(button.SearchBar.toLowerCase())
    );
  }

  // --- Add to Cart (Handle Quantity) ---
  const addToCart = (product) => {
    const existingItem = cartData.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartData.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      setCartData(updatedCart);
    } else {
      setCartData([...cartData, { ...product, quantity: 1 }]);
    }
  };

  // --- Update Quantity in Cart ---
  const updateQuantity = (id, delta) => {
    const updatedCart = cartData
      .map((item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 1) + delta;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartData(updatedCart);
  };

  // --- Proceed to Checkout (navigate) ---
  const handleProceedToCheckout = () => {
    if (cartData.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setCurrentPage("checkout");
    // close cart overlay if open
    setButton({ ...button, CartClick: false });
  };

  // Calculate Total Price
  const totalPrice = cartData.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0).toFixed(2);

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
                ? "block visible fixed right-2 md:right-12 top-20 md:px-4 bg-slate-100 max-h-[30rem] w-[22rem] md:w-[28rem] z-50 rounded-3xl shadow-2xl border-2 border-slate-300 overflow-y-auto"
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

                  <div className="grid gap-1 w-32">
                    <span className="text-gray-900 font-medium truncate">{item.name}</span>
                    <span className="text-gray-600 font-semibold">₹{item.price}</span>

                    <div className="flex items-center gap-2 bg-slate-200 w-fit rounded-md px-1">
                      <button
                        className="px-2 font-bold text-slate-600 hover:text-black"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="text-sm font-bold">{item.quantity || 1}</span>
                      <button
                        className="px-2 font-bold text-slate-600 hover:text-black"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

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
              <div className="flex flex-col items-center pb-5 pt-2 sticky bottom-0 bg-slate-100 p-2 border-t border-slate-300">
                <div className="w-full flex justify-between px-4 mb-3 text-lg font-bold text-slate-800">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>

                {/* Proceed To Checkout Button (replaces direct complete) */}
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full text-xl transition shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>

          <Aside />

          <main className="absolute top-24 left-0 md:left-40 w-full md:w-fit min-h-screen text-center md:ml-4 mt-2 z-0 pb-20">
            {displayData.length === 0 ? (
              <div className="flex justify-center mt-20 md:ml-60 w-full">
                <p className="text-2xl font-bold text-slate-400">No products found for "{button.SearchBar}"</p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 md:pl-64">
                {displayData.map((i) => {
                  const cartItem = cartData.find((item) => item.id === i.id);
                  const qty = cartItem ? cartItem.quantity : 0;

                  return (
                    <li key={i.id} className="grid border border-slate-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl p-3 bg-white relative">
                      {qty > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md z-10">
                          {qty}
                        </div>
                      )}

                      <img className="rounded-lg w-full h-40 object-cover" src={i.image} alt="" />

                      <div className="text-left mt-3 px-1">
                        <span className="font-bold text-gray-800 block truncate text-lg">{i.name}</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-extrabold text-green-700 text-lg">₹{i.price}</span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {i.delivery > 1 ? "Standard" : "Fast ⚡"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        {i.stock > 1 ? (
                          <button
                            onClick={() => addToCart(i)}
                            className="w-full rounded-lg text-white py-2 font-semibold bg-slate-800 hover:bg-green-600 transition-colors active:scale-95 shadow-md"
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 w-full rounded-lg text-gray-500 py-2 font-semibold cursor-not-allowed"
                          >
                            Out Of Stock
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </main>

          <aside
            className="fixed bottom-10 right-10 md:left-10 md:right-auto cursor-pointer z-50 animate-bounce"
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <img className="w-12 h-12 bg-slate-800 p-2 rounded-full hover:bg-green-600 transition shadow-lg border-2 border-white" src={Arrow} alt="Up" />
          </aside>
        </>
      )}

      {currentPage === "login" && <Login />}
      {currentPage === "signup" && <Signup />}

      {/* NEW: Checkout Page */}
      {currentPage === "checkout" && <Checkout />}
    </div>
  );
};

export default Home;

