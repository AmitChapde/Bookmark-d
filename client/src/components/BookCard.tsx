"use client";

import { apiFetch } from "@/lib/api";
import { Trash2 } from "lucide-react";
import type { Book, BookStatus } from "@/types";

const statuses: BookStatus[] = ["TO_READ", "READING", "COMPLETED"];

const statusLabels: Record<BookStatus, string> = {
  TO_READ: "📖 To Read",
  READING: "📚 Reading",
  COMPLETED: "✅ Completed",
};

export default function BookCard({
  book,
  onUpdate,
  onDelete,
  onShowToast,
}: {
  book: Book;
  onUpdate: (book: Book) => void;
  onDelete: (id: string) => void;
  onShowToast?: (message: string, type: "success" | "error") => void;
}) {
  const handleStatusChange = async (status: BookStatus) => {
    try {
      const data = await apiFetch(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      onUpdate(data.data);
      onShowToast?.("Status updated successfully", "success");
    } catch (error: any) {
      onShowToast?.(error.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/books/${book._id}`, {
        method: "DELETE",
      });

      onShowToast?.("Book deleted successfully", "success");
      onDelete(book._id);
    } catch (error: any) {
      onShowToast?.(error.message || "Failed to delete book", "error");
    }
  };

  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>

      {book.tags && book.tags.length > 0 && (
        <div className="book-tags">
          {book.tags.map((tag) => (
            <span key={tag} className="book-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="book-actions">
        <select
          className="book-status-select"
          value={book.status}
          onChange={(e) => handleStatusChange(e.target.value as BookStatus)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>

        <button onClick={handleDelete} className="book-delete-btn">
          <Trash2 size={16} style={{ display: "inline", marginRight: "4px" }} />
          Delete
        </button>
      </div>
    </div>
  );
}
