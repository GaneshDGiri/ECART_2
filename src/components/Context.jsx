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

  // --- NEW: Page Navigation & User Auth State ---
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'login', 'signup'
  const [currentUser, setCurrentUser] = useState(null); // Stores logged in user info

  // Persist data
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem("filterButtons", JSON.stringify(button));
  }, [button]);

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