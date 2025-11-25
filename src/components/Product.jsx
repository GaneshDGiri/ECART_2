import React, { useContext } from "react";
import { ContextData } from "./Context";

const Products = () => {
  const { cartData, setCartData, button } = useContext(ContextData);

  // --- FILTER + SORT FUNCTION ---
  const getFilteredProducts = () => {
    let filtered = [...cartData];

    // ⭐ SEARCH FILTER
    if (button.SearchBar && button.SearchBar.trim() !== "") {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(button.SearchBar.trim().toLowerCase())
      );
    }

    // ⭐ STOCK FILTER
    if (!button.Stock) {
      filtered = filtered.filter(product => product.inStock === true);
    }

    // ⭐ DELIVERY FILTER
    if (button.Delivery) {
      filtered = filtered.filter(product => product.fastDelivery === true);
    }

    // ⭐ SORTING 
    if (button.Ascending) {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (button.Descending) {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {getFilteredProducts().length > 0 ? (
        getFilteredProducts().map((item) => (
          <div key={item.id} className="border p-4 rounded-lg bg-white shadow">
            <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded" />
            <h2 className="font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600 text-sm">₹{item.price}</p>
            <p className="text-xs text-green-600">
              {item.fastDelivery ? "🚀 Fast Delivery" : "⏳ 4-5 Days Delivery"}
            </p>
            <p className={`text-sm mt-1 ${item.inStock ? "text-green-500" : "text-red-500"}`}>
              {item.inStock ? "Available" : "Out of Stock"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-xl font-bold col-span-full text-red-500">
          ❌ No products found
        </p>
      )}
    </div>
  );
};

export default Products;
