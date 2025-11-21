import React, { useContext } from 'react'
import cart from "./assets/cart.png"
import down from "./assets/down.png"
import { ContextData } from './Context'

const Header = () => {
  const { cartData, button, setButton, currentPage, setCurrentPage, currentUser, setCurrentUser } = useContext(ContextData);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setButton({...button, CartClick: false});
  };

  return (
    <header className="bg-slate-800 h-20 flex justify-between px-5 md:px-14 items-center rounded-md md:rounded-none sticky top-0 z-50">

      <span 
        className="text-3xl font-extrabold text-slate-200 md:flex cursor-pointer"
        onClick={() => setCurrentPage('home')}
      >
        EKart
      </span>

      {/* Only show Search and Cart if on Home Page */}
      {currentPage === 'home' ? (
        <>
          <input
            placeholder="Enter ProductName"
            className="md:pl-5 hidden md:block w-[28rem] h-10 rounded-full ml-10"
            type="text"
            onChange={(e) => {
              let dataInput = e.target.value;
              let searchInput = dataInput.charAt(0).toUpperCase() + dataInput.slice(1);
              setButton({ ...button, SearchBar: searchInput })
            }}
          />

          <div className='flex gap-4 items-center'>
             {currentUser && <span className='text-white font-semibold hidden md:block'>Hi, {currentUser.name}</span>}
             
             <button 
                className="border-2 border-red-400 text-red-400 w-20 h-10 rounded-md font-bold hover:bg-red-400 hover:text-white transition"
                onClick={handleLogout}
             >
               Logout
             </button>

            <button className="border-2 w-24 h-10 flex justify-center items-center rounded-md" onClick={() => setButton({ ...button, CartClick: !(button.CartClick) })}>
              <img className={`h-8 `} src={cart} alt="" />
              <span className="text-white font-semibold text-xs ml-0.5 mr-2">{cartData.length}</span>
              <img className="w-3" src={down} alt="" />
            </button>
          </div>
        </>
      ) : (
        // Show Login/Signup buttons if NOT on Home Page
        <div className='flex gap-4'>
          <button 
            className="text-white font-bold hover:text-blue-300" 
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
          <button 
            className="bg-white text-slate-800 px-4 py-2 rounded-full font-bold hover:bg-gray-200" 
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </div>
      )}

    </header>
  )
}

export default Header