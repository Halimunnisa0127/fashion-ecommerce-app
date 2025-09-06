// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=${limit}&page=${page}`
      );

      const mapped = response.data.map((product) => {
        const price = Math.round(product.price * 70);

        // Price-based discount
        let discountPercent;
        if (price < 1000) {
          discountPercent = 5;
        } else if (price < 3000) {
          discountPercent = 10;
        } else if (price < 5000) {
          discountPercent = 15;
        } else {
          discountPercent = 20;
        }

        const originalPrice = Math.round(price / (1 - discountPercent / 100));

        return {
          id: product.id,
          name: product.title,
          brand: "Nykaa",
          price,
          originalPrice,
          discountPercent,
          rating: product.rating.rate,
          image: product.image,
          category: product.category,
          inStock: true,
          description: product.description,
        };
      });

      return { data: mapped, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  activeFilter: "all",
  searchTerm: "",
  sortBy: null,
  page: 1,
  hasMore: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      state.activeFilter = action.payload;
      state.filteredProducts = filterAndSearch(
        state.products,
        action.payload,
        state.searchTerm,
        state.sortBy
      );
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredProducts = filterAndSearch(
        state.products,
        state.activeFilter,
        state.searchTerm,
        action.payload
      );
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterAndSearch(
        state.products,
        state.activeFilter,
        action.payload,
        state.sortBy
      );
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
    setCategory: (state, action) => {
      state.activeFilter = action.payload;
      state.products = [];   // reset products
      state.page = 1;        // reset pagination
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload.data.length === 0) {
          state.hasMore = false;
        } else {
          // page = 1 lo overwrite, lekapothe append
          if (action.payload.page === 1) {
            state.products = action.payload.data;
          } else {
            state.products = [...state.products, ...action.payload.data];
          }

          state.filteredProducts = filterAndSearch(
            state.products,
            state.activeFilter,
            state.searchTerm,
            state.sortBy
          );
          state.page = action.payload.page;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Helper function
function filterAndSearch(products, category, searchTerm, sortBy) {
  let result = [...products];

  if (category !== "all") {
    result = result.filter((product) => product.category === category);
  }

  if (sortBy === "lowprice-highprice") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highprice-lowprice") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "discountPercent") {
    result.sort((a, b) => b.discountPercent - a.discountPercent);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term)
    );
  }

  return result;
}

export const {
  filterProducts,
  searchProducts,
  setSortBy,
  resetProducts,
  setCategory,
} = productsSlice.actions;

export const selectAllProducts = (state) => state.products.filteredProducts;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
