"use client";

import BookCard from "@/components/BookCard";
import EmptyState from "./EmptyState";
import type { Book } from "@/types";

export default function BookList({
  books,
  onUpdate,
  onDelete,
  onShowToast,
}: {
  books: Book[];
  onUpdate: (book: Book) => void;
  onDelete: (id: string) => void;
  onShowToast?: (message: string, type: "success" | "error") => void;
}) {
  if (books.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onShowToast={onShowToast}
        />
      ))}
    </section>
  );
}
