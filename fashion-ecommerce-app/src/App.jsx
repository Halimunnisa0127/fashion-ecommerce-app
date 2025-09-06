import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import ProductsList from './Components/ProductList/ProductsList';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Wishlist from './Components/Wishlist/Wishlist';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/Cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
