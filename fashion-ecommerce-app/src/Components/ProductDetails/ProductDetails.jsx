import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/products/wishlistSlice';
import { selectAllProducts } from '../../features/products/productsSlice';
import { IoMdHeart } from "react-icons/io";
import { addToCart, increaseQty, decreaseQty, removeFromCart } from "../../features/products/cartSlice"; // ✅ added removeFromCart

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const products = useSelector(selectAllProducts);
  const wishlist = useSelector(state => state.wishlist);
  const cart = useSelector(state => state.cart);

  const product = products.find(p => p.id === parseInt(id));
  const [tempQty, setTempQty] = useState(1); // quantity before adding to cart

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="product-card container mx-auto px-10 py-8">
        <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-3xl hover:bg-gray-100">

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-contain"
          />

          {/* Discount Badge */}
          {product.discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discountPercent}% OFF
            </span>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 border-0 text-2xl"
          >
            <IoMdHeart color={isInWishlist ? "red" : "gray"} />
          </button>

          {/* Product Info */}
          <div className="justify-between p-7 leading-normal">
            <p className="text-2xl font-bold tracking-tight">{product.brand}</p>
            <h5 className="mb-3 font-normal">{product.name}</h5>
            <p className="mb-3 font-normal">
              {product.originalPrice && (
                <>
                  <span className="line-through mr-2">₹{product.originalPrice}</span>
                  <span className="font-bold">₹{product.price}</span>
                </>
              )}
            </p>

            {/* Rating */}
            <div className="mt-2">
              <span className="text-green-800 font-semibold">
                {product.rating} ★
              </span>
            </div>

            {/* Add To Cart / Quantity Controls */}
            {!cartItem ? (
              <>
                {/* Quantity selector before adding */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => tempQty > 1 && setTempQty(tempQty - 1)}
                    disabled={tempQty <= 1}
                  >
                    –
                  </button>

                  <span className="text-lg font-semibold">{tempQty}</span>

                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setTempQty(tempQty + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => dispatch(addToCart({ ...product, quantity: tempQty }))} // ✅ adds chosen quantity
                >
                  Add to Cart
                </button>
              </>
            ) : (
              /* Controls after item is in cart */
              <div className="flex items-center gap-2 mt-3">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    if (cartItem.quantity > 1) {
                      dispatch(decreaseQty(product.id));
                    } else {
                      dispatch(removeFromCart(product.id));
                    }
                  }}
                >
                  –
                </button>

                <span className="text-lg font-semibold">{cartItem.quantity}</span>

                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => dispatch(increaseQty(product.id))}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-lg">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
