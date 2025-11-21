import React, { useContext, useEffect } from 'react';
import { ContextData } from './Context';

const Aside = () => {
  let { cartData, setCartData, button, setButton } = useContext(ContextData);

  // Load button state from localStorage on mount
  useEffect(() => {
    const savedButton = localStorage.getItem('filterButtons');
    if (savedButton) {
      const parsed = JSON.parse(savedButton);
      setButton(parsed);

      // Set the checkboxes/radios based on saved state
      if (parsed.Ascending) document.querySelector('#Ascending').checked = true;
      if (parsed.Descending) document.querySelector('#descending').checked = true;
      if (parsed.Stock) document.querySelector('#stock').checked = true;
      if (parsed.Delivery) document.querySelector('#delivery').checked = true;
    }
  }, [setButton]);

  // Save button state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('filterButtons', JSON.stringify(button));
  }, [button]);

  const handleClear = () => {
    const reset = { Ascending: false, Descending: false, Stock: false, Delivery: false };
    setButton(reset);
    localStorage.removeItem('filterButtons');

    document.querySelector('#Ascending').checked = false;
    document.querySelector('#descending').checked = false;
    document.querySelector('#stock').checked = false;
    document.querySelector('#delivery').checked = false;
  };

  return (
    <aside className='bg-slate-800 w-[10.3rem] md:w-96 h-fit text-zinc-300 font-semibold text-xs md:text-base ml-1 md:pl-12 mt-2 rounded-md md:rounded-3xl'>
      <ul className='grid gap-7 md:gap-10 pl-[.49rem]'>
        <li className='text-xl md:text-3xl mt-3 md:mt-7'>Filter Products</li>
        <li>
          <input
            type="radio"
            name="action"
            id="Ascending"
            onClick={(e) => e.target.checked && setButton({ ...button, Ascending: true, Descending: false })}
          />
          <label htmlFor="Ascending">Ascending</label>
        </li>
        <li>
          <input
            type="radio"
            name="action"
            id="descending"
            onClick={(e) => e.target.checked && setButton({ ...button, Descending: true, Ascending: false })}
          />
          <label htmlFor="descending">Descending</label>
        </li>
        <li>
          <input
            type="checkbox"
            name="SecondAction"
            id="stock"
            onClick={(e) => setButton({ ...button, Stock: e.target.checked })}
          />
          <label htmlFor="stock">Include Out Of Stock</label>
        </li>
        <li>
          <input
            type="checkbox"
            name="SecondAction"
            id="delivery"
            onClick={(e) => setButton({ ...button, Delivery: e.target.checked })}
          />
          <label htmlFor="delivery">Fast Delivery Only</label>
        </li>
        <li>
          <button
            className='bg-white text-slate-700 text-xl md:text-2xl px-6 md:px-16 py-2 md:py-3 rounded-md md:rounded-full font-bold mb-4 mt-5 mr-[.20rem]'
            onClick={handleClear}
          >
            Clear Filter
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
