// Products.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useBookmarkStore from "./app/BookmarkStore";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { fetchProducts } from "./api";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Utilities from Zustand Store
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore(
    (state) => ({
      bookmarks: state.bookmarks,
      addBookmark: state.addBookmark,
      removeBookmark: state.removeBookmark,
    })
  );

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Bookmark Functionality
  const handleBookmarkToggle = (product) => {
    const isBookmarked = bookmarks.some((item) => item.id === product.id);
    if (isBookmarked) {
      removeBookmark(product.id);
    } else {
      addBookmark(product);
    }
  };

  if (isLoading) {
    return <h3 className="text-center">Loading....</h3>;
  }

  if (error) {
    return <h3 className="text-center">Error: {error}</h3>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Purchase
        </h2>
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleBookmarkToggle={handleBookmarkToggle}
              bookmarks={bookmarks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
