import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity; // ✅ respect chosen qty
      } else {
        state.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    updateQty: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
