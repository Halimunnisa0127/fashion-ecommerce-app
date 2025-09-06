import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMethod, processPayment, clearPayment } from "../../features/products/paymentSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const { method, status, error } = useSelector((state) => state.payment);
  const cart = useSelector((state) => state.cart);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = () => {
    if (!method) return alert("Please select a payment method!");
    dispatch(processPayment({ amount: totalPrice, method }));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">💳 Payment</h2>
      <p className="mb-2">Total Amount: <span className="font-semibold">₹{totalPrice}</span></p>

      {/* Payment Method */}
      <div className="flex flex-col gap-2 mb-4">
        {["UPI", "Card", "NetBanking", "Cash on Delivery"].map((m) => (
          <label key={m} className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value={m}
              checked={method === m}
              onChange={() => dispatch(setMethod(m))}
            />
            {m}
          </label>
        ))}
      </div>

      {/* Status */}
      {status === "processing" && <p className="text-blue-600">Processing payment...</p>}
      {status === "success" && <p className="text-green-600">✅ Payment Successful!</p>}
      {status === "failed" && <p className="text-red-600">❌ {error}</p>}

      {/* Buttons */}
      <button
        onClick={handlePay}
        disabled={status === "processing"}
        className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Pay Now
      </button>

      {status !== "idle" && (
        <button
          onClick={() => dispatch(clearPayment())}
          className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default Payment;
