import { createContext, useState, useEffect } from "react";

export const ContextData = createContext();

const Context = ({ children }) => {
  // Load initial cartData
  const [cartData, setCartData] = useState(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load initial button state
  const [button, setButton] = useState(() => {
    const savedButton = localStorage.getItem("filterButtons");
    return savedButton
      ? JSON.parse(savedButton)
      : {
          Ascending: false,
          Descending: false,
          Stock: false,
          Delivery: false,
          CartClick: false,
          SearchBar: "",
        };
  });

  // --- UPDATED: Load User from LocalStorage ---
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- UPDATED: Load Current Page from LocalStorage ---
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? savedPage : "home";
  });

  // Persist Cart Data
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  // Persist Button State
  useEffect(() => {
    localStorage.setItem("filterButtons", JSON.stringify(button));
  }, [button]);

  // --- NEW: Persist User State ---
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // --- NEW: Persist Page State ---
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <ContextData.Provider 
      value={{ 
        cartData, setCartData, 
        button, setButton,
        currentPage, setCurrentPage,
        currentUser, setCurrentUser 
      }}
    >
      {children}
    </ContextData.Provider>
  );
};

export default Context;