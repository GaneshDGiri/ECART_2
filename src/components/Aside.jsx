import React, { useContext } from "react";
import { ContextData } from "./Context";

const Aside = () => {
  const { button, setButton } = useContext(ContextData);

  // Toggle filter buttons (only one active at a time for sorting)
  const handleSort = (type) => {
    setButton({
      ...button,
      Ascending: type === "asc" ? !button.Ascending : false,
      Descending: type === "desc" ? !button.Descending : false,
    });
  };

  // Toggle stock filter
  const toggleStock = () => {
    setButton({ ...button, Stock: !button.Stock });
  };

  // Toggle delivery filter
  const toggleDelivery = () => {
    setButton({ ...button, Delivery: !button.Delivery });
  };

  // Clear all filters
  const clearFilter = () => {
    setButton({
      Ascending: false,
      Descending: false,
      Stock: false,
      Delivery: false,
      CartClick: false,
      SearchBar: "",
    });
  };

  return (
    <aside className="fixed top-24 left-5 bg-white shadow-xl rounded-lg p-4 w-48 border border-gray-300">
      <h2 className="text-lg font-bold text-slate-700 mb-4 text-center">
        Filters
      </h2>

      {/* SORTING */}
      <section className="mb-4">
        <p className="font-semibold text-gray-700 mb-2">Sort By Price</p>
        <button
          className={`w-full py-2 mb-2 rounded-md font-semibold transition ${
            button.Ascending ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSort("asc")}
        >
          Low → High
        </button>

        <button
          className={`w-full py-2 rounded-md font-semibold transition ${
            button.Descending ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSort("desc")}
        >
          High → Low
        </button>
      </section>

      {/* FILTERS */}
      <section className="mb-4">
        <p className="font-semibold text-gray-700 mb-2">Filter Options</p>

        <button
          className={`w-full py-2 mb-2 rounded-md font-semibold transition ${
            button.Stock ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={toggleStock}
        >
          Include Out of Stock
        </button>

        <button
          className={`w-full py-2 rounded-md font-semibold transition ${
            button.Delivery ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={toggleDelivery}
        >
          Fast Delivery Only
        </button>
      </section>

      {/* CLEAR BUTTON */}
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 font-bold rounded-md transition"
        onClick={clearFilter}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default Aside;
