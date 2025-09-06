import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // ✅ useSelector add chesa
import { searchProducts } from '../../features/products/productsSlice';
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react"; // ✅ Cart icon lucide-react nundi

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  // ✅ Cart items ni redux nundi theesukuntam
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="dark:bg-gray-800 text-white shadow-md py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Logo + Toggle */}
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="text-fuchsia-800 text-4xl font-bold">Nykaa</div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`${isOpen ? "block" : "hidden"} w-full md:w-auto md:block`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-white font-medium text-sm mt-4 md:mt-0">
            <li>
              <Link className="hover:text-purple-400" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link className="hover:text-purple-400" to="/wishlist" onClick={() => setIsOpen(false)}>Wishlist</Link>
            </li>
            <li className="relative">
              <Link className="hover:text-purple-400 flex items-center gap-1" to="/cart" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={22} />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* 🔍 Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for brands, products and more"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-sm"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
