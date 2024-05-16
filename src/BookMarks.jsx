import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import useBookmarkStore from "./app/BookmarkStore";


const Bookmarks = () => {
  // Retrieve bookmarked products from Zustand store
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore(
    (state) => ({
      bookmarks: state.bookmarks,
      addBookmark: state.addBookmark,
      removeBookmark: state.removeBookmark,
    })
  );
  const handleBookmarkToggle = (product) => {
    const isBookmarked = bookmarks.some((item) => item.id === product.id);
    if (isBookmarked) {
      removeBookmark(product.id);
    } else {
      addBookmark(product);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Bookmarked Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {bookmarks.map((product) => (
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

export default Bookmarks;
