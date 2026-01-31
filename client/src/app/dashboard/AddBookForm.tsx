"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, X, BookOpen, User, Tag } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import type { Book } from "@/types";

export default function AddBookForm({
  onAdd,
}: {
  onAdd: (book: Book) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      showToast("Title and author are required", "error");
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title,
          author,
          status: "TO_READ",
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        }),
      });

      onAdd(data.data.newBook);
      setTitle("");
      setAuthor("");
      setTags("");
      setIsOpen(false);
      showToast("Book added successfully", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to add book", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
   
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Book</h3>
              <button
                className="modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-field">
                <label className="form-label">
                  <BookOpen size={16} />
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  autoFocus
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  <User size={16} />
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  <Tag size={16} />
                  Tags (optional)
                </label>
                <input
                  type="text"
                  placeholder="fiction, sci-fi, fantasy..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="form-input"
                />
                <span className="form-hint">Separate tags with commas</span>
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={isLoading || !title || !author}
              >
                {isLoading ? "Adding..." : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      )}

    
      <button
        type="button"
        className="add-book-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Add book"
      >
        <Plus size={20} />
        <span className="add-book-text">Add Book</span>
      </button>
    </>
  );
}
