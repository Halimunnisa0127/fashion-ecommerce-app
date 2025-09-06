import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product?.image}
          alt={product?.name}
          className="product-image rounded-t-lg w-60 mx-auto mt-4 h-50 max-w-full"
        />
        {product?.discountPercent > 0 && (
          <span className="discount-tag absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discountPercent}% OFF
          </span>
        )}
      </Link>
      <div className="p-5 text-dark">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {product?.brand}
        </h5>
        <h6 className="mb-3 font-normal">
          {product?.name}
        </h6>
        {product?.price && (
          <p className="mb-3 font-normal ">
            <span className="line-through mr-2">
              ₹{product.originalPrice}
            </span>
            <span className="font-bold ">
              ₹{product.price}
            </span>
          </p>
        )}
        <div className="product-rating mt-2 ">
          <span className="rating text-green-800  font-bold text-base">
            {product.rating} &#9733;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
