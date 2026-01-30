"use client";

import type { Book } from "@/types";

export default function DashboardStats({ books }: { books: Book[] }) {
  const total = books.length;
  const toRead = books.filter((b) => b.status === "TO_READ").length;
  const reading = books.filter((b) => b.status === "READING").length;
  const completed = books.filter((b) => b.status === "COMPLETED").length;

  return (
    <section className="dashboard-stats">
      <h2 className="stats-title">📚 Your Library</h2>
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total Books</span>
        </div>
        <div className="stat-card stat-toread">
          <span className="stat-number">{toRead}</span>
          <span className="stat-label">To Read</span>
        </div>
        <div className="stat-card stat-reading">
          <span className="stat-number">{reading}</span>
          <span className="stat-label">Reading</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </section>
  );
}
