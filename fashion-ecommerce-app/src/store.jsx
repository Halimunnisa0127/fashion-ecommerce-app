import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import wishlistReducer from './features/products/wishlistSlice'
import cartReducer from './features/products/cartSlice';
import paymentReducer from "./features/products/paymentSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
});
