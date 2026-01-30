"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/types";

type BooksContextType = {
  books: Book[];
  loading: boolean;
  fetchBooks: () => Promise<void>;
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
};

const BooksContext = createContext<BooksContextType | null>(null);

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/books");
      setBooks(data.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback((book: Book) => {
    setBooks((prev) => [...prev, book]);
  }, []);

  const updateBook = useCallback((updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
    );
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b._id !== id));
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used within BooksProvider");
  return ctx;
};
