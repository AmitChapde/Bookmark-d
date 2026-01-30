"use client";

import BookCard from "@/components/BookCard";
import EmptyState from "./EmptyState";
import type { Book } from "@/types";

export default function BookList({
  books,
  onUpdate,
  onDelete,
}: {
  books: Book[];
  onUpdate: (book: Book) => void;
  onDelete: (id: string) => void;
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
        />
      ))}
    </section>
  );
}
