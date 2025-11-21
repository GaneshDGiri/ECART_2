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

  // --- NEW: Add to Cart (Handle Quantity) ---
  const addToCart = (product) => {
    const existingItem = cartData.find((item) => item.id === product.id);

    if (existingItem) {
      // If item exists, increase quantity
      const updatedCart = cartData.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      setCartData(updatedCart);
    } else {
      // If new, add with quantity 1
      setCartData([...cartData, { ...product, quantity: 1 }]);
    }
  };

  // --- NEW: Update Quantity in Cart ---
  const updateQuantity = (id, delta) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === id) {
        const newQuantity = (item.quantity || 1) + delta;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove item if quantity becomes 0

    setCartData(updatedCart);
  };

  // --- Checkout Function ---
  const handleCheckout = () => {
    if (cartData.length === 0) return;
    alert("Order is complete!");
    setCartData([]);
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
                ? "block visible absolute right-2 md:right-12 top-16 md:px-4 bg-slate-100 max-h-[30rem] w-[22rem] md:w-[28rem] z-50 rounded-3xl shadow-2xl border-2 border-slate-300 overflow-y-auto"
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
                  
                  {/* Product Info & Quantity Controls */}
                  <div className="grid gap-1 w-32">
                    <span className="text-gray-900 font-medium truncate">{item.name}</span>
                    <span className="text-gray-600 font-semibold">${item.price}</span>
                    
                    {/* Quantity Control Buttons */}
                    <div className="flex items-center gap-2 bg-slate-200 w-fit rounded-md px-1">
                        <button 
                            className="px-2 font-bold text-slate-600 hover:text-black"
                            onClick={() => updateQuantity(item.id, -1)}
                        >-</button>
                        <span className="text-sm font-bold">{item.quantity || 1}</span>
                        <button 
                            className="px-2 font-bold text-slate-600 hover:text-black"
                            onClick={() => updateQuantity(item.id, 1)}
                        >+</button>
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
                    <span>${totalPrice}</span>
                </div>
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

          <main className="absolute top-20 left-40 w-fit h-fit text-center ml-4 mt-2 z-0">
            <ul className="grid gap-3 md:gap-6 md:grid-cols-4 md:ml-60">
              {displayData.map((i) => {
                // Find current quantity of this item in cart (if any)
                const cartItem = cartData.find((item) => item.id === i.id);
                const qty = cartItem ? cartItem.quantity : 0;

                return (
                  <li key={i.id} className="grid border-black border-2 rounded-md p-2 bg-white relative">
                    {/* Show Quantity Badge if in cart */}
                    {qty > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {qty}
                        </div>
                    )}

                    <img className="rounded-md ml-[.20rem] mt-[.20rem]" src={i.image} alt="" />
                    <span className="font-semibold text-gray-800 mt-2">{i.name}</span>
                    <span className="font-bold text-zinc-700">${i.price}</span>
                    <span className="text-neutral-800 font-semibold mb-2">
                      {i.delivery > 1 ? "4 Days Delivery" : "Fast delivery"}
                    </span>

                    {i.stock > 1 ? (
                        <button
                          onClick={() => addToCart(i)}
                          className="w-fit mx-auto px-4 rounded-md text-white py-1 font-semibold mb-[.20rem] bg-green-600 hover:bg-green-700 transition active:scale-95"
                        >
                          Add To Cart
                        </button>
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

          <aside
            className="fixed bottom-10 md:bottom-5 left-10 md:left-10 cursor-pointer z-50"
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <img className="w-14 bg-slate-600 rounded-full hover:bg-slate-800 transition" src={Arrow} alt="Scroll Up" />
          </aside>
        </>
      )}

      {currentPage === "login" && <Login />}
      {currentPage === "signup" && <Signup />}
    </div>
  );
};

export default Home;

