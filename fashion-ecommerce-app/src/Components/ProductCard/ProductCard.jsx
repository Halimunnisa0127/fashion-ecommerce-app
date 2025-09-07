import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="image-container relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.name}
            className={`product-image rounded-t-lg w-60 mx-auto mt-4 h-50 max-w-full transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
              </svg>
            </div>
          )}
          
          {product?.discountPercent > 0 && (
            <span className="discount-tag absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded transform transition-all duration-500 hover:scale-110 animate-bounce hover:animate-none">
              {product.discountPercent}% OFF
            </span>
          )}
          
          {/* Quick action buttons that appear on hover */}
          <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-5 text-dark">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 hover:text-blue-600">
          {product?.brand}
        </h5>
        <h6 className="mb-3 font-normal transition-all duration-300 hover:translate-x-1">
          {product?.name}
        </h6>
        {product?.price && (
          <div className="mb-3 font-normal transition-all duration-500">
            <span className="line-through mr-2 text-gray-500">
              ₹{product.originalPrice}
            </span>
            <span className="font-bold text-red-600 relative">
              ₹{product.price}
              {/* Animated price underline effect */}
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-red-600 transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}></span>
            </span>
          </div>
        )}
        <div className="product-rating mt-2 flex items-center">
          {/* Star rating visual */}
          <div className="relative inline-flex mr-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="rating text-green-800 font-bold text-base transition-all duration-300 hover:scale-105">
            {product.rating} &#9733;
          </span>
        </div>       
      </div>
      
      {/* Floating animation for the entire card */}
      <style jsx>{`
        .product-card {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .discount-tag {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </div>
  );
};

export default ProductCard;