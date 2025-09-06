// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import ProductsList from './Components/ProductList/ProductsList';
import AboutPage from './Components/AboutPage/AboutPage';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Wishlist from './Components/Wishlist/Wishlist';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
import Footer from './Components/Footer/Footer';



function App() {
return (
<div className="App min-h-screen flex flex-col">
<Header />
<main className="flex-grow">
<Routes>
<Route path="/" element={<ProductsList />} />
<Route path="/aboutpage" element={<AboutPage />} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/wishlist" element={<Wishlist />} />
<Route path="/cart" element={<Cart />} />
<Route path="/payment" element={<Payment />} />

</Routes>
</main>
<Footer />
</div>
);
}


export default App;