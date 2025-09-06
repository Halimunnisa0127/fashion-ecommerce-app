import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../features/products/cartSlice";
import { useNavigate } from "react-router-dom";
import "../../index.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Navigate to home
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* LEFT: Cart Items */}
      <div className="flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Your cart is empty
            </h1>

            <img
              src="https://img.freepik.com/premium-vector/empty-cart-character-ilustration_854078-624.jpg"
              alt="Empty cart"
              className="w-72 max-w-full mx-auto mb-6 drop-shadow-md"
            />

            <button
              type="button"
              onClick={handleClick}
              className="px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-xl shadow-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition"
            >
              🛍️ Go to Shop
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl border border-gray-200 p-4 mb-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-contain rounded-lg"
                  />
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800">
                      {item?.brand}
                    </h5>
                    <p className="text-gray-700">{item?.name}</p>
                    <p className="text-sm text-gray-500">
                      <span className="line-through mr-2">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-green-600 font-bold">
                        ₹{item.price}
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      Subtotal: ₹
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    className={`px-3 py-1 rounded-full text-black font-bold ${
                      item.quantity === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-200"
                    }`}
                    disabled={item.quantity === 1}
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    –
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = Number(e.target.value);
                      if (newQty >= 1) {
                        dispatch({
                          type: "cart/updateQty",
                          payload: { id: item.id, quantity: newQty },
                        });
                      }
                    }}
                    className="w-16 text-center border border-gray-300 rounded-lg text-black no-spinner"
                  />

                  <button
                    className="px-3 py-1 bg-gray-200 rounded-full text-black font-bold"
                    onClick={() => dispatch(increaseQty(item.id))}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT: Order Summary */}
      {cart.length > 0 && (
        <div className="w-full md:w-1/3 h-fit sticky top-6 self-start">
          <div className="p-4 bg-gray-100 rounded-lg shadow text-black">
            <h3 className="text-xl font-semibold mb-2">🧾 Order Summary</h3>
            <p className="text-gray-700">
              Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p className="text-gray-700">Products: {cart.length}</p>
            <h3 className="text-xl font-bold mt-2">
              Total Amount: ₹{totalPrice.toLocaleString()}
            </h3>

            <button
              onClick={() => dispatch(clearCart())}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
            >
              Clear Cart
            </button>

            {/* ✅ Proceed to Payment */}
            <button
              onClick={() => navigate("/payment")}
              className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
