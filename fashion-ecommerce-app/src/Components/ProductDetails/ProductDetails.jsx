
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/products/wishlistSlice';
import { selectAllProducts } from '../../features/products/productsSlice';
import { IoMdHeart, IoIosStar, IoIosArrowForward } from "react-icons/io";
import { addToCart, increaseQty, decreaseQty, removeFromCart } from "../../features/products/cartSlice";
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const products = useSelector(selectAllProducts);
  const wishlist = useSelector(state => state.wishlist);
  const cart = useSelector(state => state.cart);

  const product = products.find(p => p.id === parseInt(id));
  const [tempQty, setTempQty] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Sample product images for gallery (in a real app, this would come from product data)
  const productImages = product ? [
    product.image,
    product.image, // In reality, you'd have multiple images
    product.image,
    product.image
  ] : [];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-64 text-red-500 text-xl"
      >
        Product not found
      </motion.div>
    );
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

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: tempQty }));
    setAddedToCart(true);
    
    // Reset added to cart animation after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.5, repeat: Infinity }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto p-6 text-black"
    >
      {/* Breadcrumb */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center text-sm text-gray-500 mb-6"
      >
        <span>Home</span>
        <IoIosArrowForward className="mx-2" />
        <span>Products</span>
        <IoIosArrowForward className="mx-2" />
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </motion.div>

      <motion.h1 
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {product.name}
      </motion.h1>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="product-card bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Product Image Gallery */}
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 p-6 relative"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-zoom-in"
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              >
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={productImages[currentImage]}
                  alt={product.name}
                  className="w-full h-72 object-contain rounded-lg bg-white"
                />
              </motion.div>

              {/* Discount Badge */}
              {product.discountPercent > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded"
                >
                  {product.discountPercent}% OFF
                </motion.span>
              )}

              {/* Wishlist Heart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                aria-label="Add to wishlist"
              >
                <motion.div
                  animate={{ scale: isInWishlist ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoMdHeart 
                    size={24} 
                    color={isInWishlist ? "red" : "gray"} 
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
              {productImages.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-16 h-16 border-2 rounded cursor-pointer ${currentImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-100"
          >
            <motion.p 
              variants={itemVariants}
              className="text-sm text-blue-600 font-semibold mb-2"
            >
              {product.brand}
            </motion.p>
            
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold mb-4"
            >
              {product.name}
            </motion.h2>

            {/* Rating */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center mb-4"
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <IoIosStar 
                    key={i} 
                    size={20} 
                    className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="ml-2 text-green-800 font-semibold">
                {product.rating}/5
              </span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-500">42 Reviews</span>
            </motion.div>

            {/* Price */}
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="ml-2 text-sm font-semibold text-green-600">
                    You save ₹{(product.originalPrice - product.price).toFixed(2)} ({product.discountPercent}%)
                  </span>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-6"
            >
              {product.description}
            </motion.p>

            {/* Add To Cart / Quantity Controls */}
            <motion.div variants={itemVariants}>
              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700 mb-2">Quantity:</span>
                
                {!cartItem ? (
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center border border-gray-300 rounded-lg"
                    >
                      <button
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        onClick={() => tempQty > 1 && setTempQty(tempQty - 1)}
                        disabled={tempQty <= 1}
                      >
                        –
                      </button>
                      
                      <motion.span 
                        key={tempQty}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-2 text-lg font-semibold"
                      >
                        {tempQty}
                      </motion.span>
                      
                      <button
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        onClick={() => setTempQty(tempQty + 1)}
                      >
                        +
                      </button>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className="ml-4 flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center border border-gray-300 rounded-lg"
                    >
                      <button
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
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
                      
                      <motion.span 
                        key={cartItem.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-2 text-lg font-semibold"
                      >
                        {cartItem.quantity}
                      </motion.span>
                      
                      <button
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        onClick={() => dispatch(increaseQty(product.id))}
                      >
                        +
                      </button>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="ml-4 flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                    >
                      Remove from Cart
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Added to cart confirmation */}
            <AnimatePresence>
              {addedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg"
                >
                  ✅ Added to cart successfully!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Features */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 pt-6 border-t border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-3">Product Features:</h3>
              <ul className="space-y-2">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>High-quality materials</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Eco-friendly packaging</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>1-year warranty included</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Free shipping on orders above ₹999</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-full"
            >
              <img
                src={productImages[currentImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetails;