import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// async simulation (API call laga untundi)
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async ({ amount, method }, { rejectWithValue }) => {
    try {
      // fake API simulation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // payment success (90% chance)
      if (Math.random() > 0.1) {
        return { amount, method, status: "success" };
      } else {
        throw new Error("Payment failed");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    method: null,
    status: "idle", // idle | processing | success | failed
    error: null,
    history: [],
  },
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    clearPayment: (state) => {
      state.method = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = "processing";
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = "success";
        state.history.push(action.payload); // save payment details
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setMethod, clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
