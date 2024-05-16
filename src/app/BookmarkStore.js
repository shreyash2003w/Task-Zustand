import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


const BookmarkStore = (set) => ({
  bookmarks: [],

  addBookmark: (bookmark) => {
    set((state) => ({
      bookmarks: [...state.bookmarks, bookmark],
    }));
  },

  removeBookmark: (bookmarkId) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId
      ),
    }));
  },
});

const useBookmarkStore = create(
  devtools(
    persist(BookmarkStore, {
      name: "bookmarks",
    })
  )
);

export default useBookmarkStore;
