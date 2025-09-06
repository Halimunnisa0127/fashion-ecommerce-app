import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import aboutReducer from './features/products/aboutSlice';
import wishlistReducer from './features/products/wishlistSlice'
import cartReducer from './features/products/cartSlice';
import paymentReducer from "./features/products/paymentSlice";
import footerReducer from "./features/products/footerSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    payment: paymentReducer,
    footer: footerReducer,
    about: aboutReducer,
  },
});
