"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { apiFetch } from "@/lib/api";
import DashboardStats from "./DashboardStats";
import BookList from "./BookList";
import FilterBar from "./FilterBar";
import AddBookForm from "./AddBookForm";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import type { Book, BookStatus } from "@/types";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast, showToast, hideToast } = useToast();

  const [books, setBooks] = useState<Book[]>([]);
  const [fetching, setFetching] = useState(true);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<BookStatus | "">("");
  const [tagFilter, setTagFilter] = useState("");

  // Show login success toast
  useEffect(() => {
    if (searchParams.get("loggedIn") === "true") {
      showToast("Welcome back! You're now logged in.", "success");
      // Remove the query param from URL without reload
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, showToast, router]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await apiFetch("/books");
      setBooks(data.data);
      setFetching(false);
    };

    if (isAuthenticated) fetchBooks();
  }, [isAuthenticated]);

  // Extract unique tags from all books
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    books.forEach((book) => {
      book.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [books]);

  // Filter books based on current filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesStatus = !statusFilter || book.status === statusFilter;
      const matchesTag = !tagFilter || book.tags?.includes(tagFilter);
      return matchesStatus && matchesTag;
    });
  }, [books, statusFilter, tagFilter]);

  if (loading || fetching || !isAuthenticated) return null;

  return (
    <main className="dashboard-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}

      <DashboardStats books={books} />

      <FilterBar
        statusFilter={statusFilter}
        tagFilter={tagFilter}
        allTags={allTags}
        onStatusChange={setStatusFilter}
        onTagChange={setTagFilter}
      />

      <BookList
        books={filteredBooks}
        onUpdate={(updatedBook) =>
          setBooks((prev) =>
            prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
          )
        }
        onDelete={(id) => setBooks((prev) => prev.filter((b) => b._id !== id))}
        onShowToast={showToast}
      />

      <AddBookForm
        onAdd={(newBook) => setBooks((prev) => [...prev, newBook])}
      />
    </main>
  );
}
