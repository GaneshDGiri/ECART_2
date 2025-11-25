import React, { useContext } from 'react'
import cart from "./assets/cart.png"
import down from "./assets/down.png"
import { ContextData } from './Context'

const Header = () => {
  const { cartData, button, setButton, currentPage, setCurrentPage, currentUser, setCurrentUser } = useContext(ContextData);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setButton({ ...button, CartClick: false });
  };

  // 🔍 Search Handler
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setButton({ ...button, SearchBar: searchValue });
  };

  // ❌ Clear Search Handler
  const clearSearch = () => {
    setButton({ ...button, SearchBar: "" });
  };

  return (
    <header className="bg-slate-800 h-20 flex justify-between px-5 md:px-14 items-center sticky top-0 z-50 shadow-lg">

      <span 
        className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setCurrentPage('home')}
      >
        ECart India
      </span>

      {currentPage === 'home' ? (
        <>
          {/* ✨ BEAUTIFUL SEARCH BOX START ✨ */}
          <div className="hidden md:flex items-center bg-slate-700/50 border border-slate-600 rounded-full px-4 py-2 w-[24rem] lg:w-[32rem] focus-within:bg-slate-100 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-400/50 transition-all duration-300 group shadow-inner">
            
            {/* Search Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none text-slate-200 group-focus-within:text-slate-800 placeholder-slate-400 w-full ml-3 font-medium"
              type="text"
              value={button.SearchBar}
              onChange={handleSearch}
            />

            {/* Clear (X) Button - Only shows when text exists */}
            {button.SearchBar && (
              <button onClick={clearSearch} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          {/* ✨ BEAUTIFUL SEARCH BOX END ✨ */}

          <div className='flex gap-4 items-center'>
            {currentUser && (
              <span className='text-slate-300 font-semibold hidden lg:block text-sm'>
                Hello, <span className="text-white">{currentUser.name}</span>
              </span>
            )}

            <button 
              className="hidden md:block border border-red-400 text-red-400 px-4 py-1.5 rounded-full font-bold hover:bg-red-500 hover:text-white transition text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>

            {/* Cart Button */}
            <button 
              className="relative group flex justify-center items-center p-2"
              onClick={() => setButton({ ...button, CartClick: !button.CartClick })}
            >
               {/* Cart Icon */}
              <div className="relative">
                <img className="h-8 transition-transform group-hover:scale-110" src={cart} alt="Cart" />
                {cartData.length > 0 && (
                   <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                     {cartData.length}
                   </span>
                )}
              </div>
              <img className="w-3 ml-1 opacity-70" src={down} alt="" />
            </button>
          </div>
        </>
      ) : (
        <div className='flex gap-4'>
          <button 
            className="text-white font-bold hover:text-green-400 transition" 
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
          <button 
            className="bg-green-500 text-white px-5 py-2 rounded-full font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30" 
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  )
}

export default Header;