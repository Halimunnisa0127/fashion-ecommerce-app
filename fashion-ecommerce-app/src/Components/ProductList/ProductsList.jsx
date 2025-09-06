// src/components/ProductsList/ProductsList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  getProductsStatus,
  getProductsError,
  filterProducts,
  setSortBy,
  resetProducts, // 🔹 Add this action in productsSlice
} from "../../features/products/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { Filter, X } from "lucide-react";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const { page, hasMore, selectedCategory } = useSelector(
    (state) => state.products
  );
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({ page: 1, limit: 10, category: selectedCategory }));
    }
  }, [status, dispatch, selectedCategory]);

  const loadMore = () => {
    if (hasMore) {
      dispatch(fetchProducts({ page: page + 1, limit: 10, category: selectedCategory }));
    }
  };

  const handleCategoryChange = (category) => {
    dispatch(resetProducts()); // 🔹 clear old products & reset page
    dispatch(filterProducts(category));
    dispatch(fetchProducts({ page: 1, limit: 20, category }));
  };

  let content;

  if (status === "loading" && products.length === 0) {
    content = <Loader />;
  } else if (status === "succeeded" || (status === "loading" && products.length > 0)) {
    content = (
      <>
        {/* Floating Filter Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-24 left-4 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition z-100"
        >
          <Filter className="w-6 h-6" />
        </button>

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 z-100
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Filters & Sorting
            </h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-gray-600 hover:text-red-500 transition" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto h-full">
            {/* Filter Options */}
            <div className="mb-8">
              <h3 className="text-md font-semibold text-gray-700 mb-3">
                Categories
              </h3>
              <div className="flex flex-col gap-2 text-gray-900">
                {[
                  { value: "all", label: "All Categories" },
                  { value: "men's clothing", label: "Men's Clothing" },
                  { value: "jewelery", label: "Jewelery" },
                  { value: "electronics", label: "Electronics" },
                  { value: "women's clothing", label: "Women's Clothing" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer hover:text-amber-600"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={opt.value}
                      onChange={() => handleCategoryChange(opt.value)}
                      className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-3 ">
                Sort By
              </h3>
              <div className="flex flex-col gap-2 text-gray-900">
                {[
                  { value: "lowprice-highprice", label: "Price (Low → High)" },
                  { value: "highprice-lowprice", label: "Price (High → Low)" },
                  { value: "rating", label: "Rating" },
                  { value: "discountPercent", label: "Discount" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer hover:text-amber-600"
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={opt.value}
                      onChange={(e) => dispatch(setSortBy(e.target.value))}
                      className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 text-black">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center my-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </>
    );
  } else if (status === "failed") {
    content = (
      <div className="text-red-600 text-center mt-4">Error: {error}</div>
    );
  }

  return (
    <div className="products-container px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-600 drop-shadow">
        Fashion Hub Best Sellers
      </h2>
      {content}
    </div>
  );
};

export default ProductsList;
