"use client";

import type { BookStatus } from "@/types";

type FilterBarProps = {
  statusFilter: BookStatus | "";
  tagFilter: string;
  allTags: string[];
  onStatusChange: (status: BookStatus | "") => void;
  onTagChange: (tag: string) => void;
};

export default function FilterBar({
  statusFilter,
  tagFilter,
  allTags,
  onStatusChange,
  onTagChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as BookStatus | "")}
        >
          <option value="">All Statuses</option>
          <option value="TO_READ">📖 To Read</option>
          <option value="READING">📚 Reading</option>
          <option value="COMPLETED">✅ Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Tag</label>
        <select
          className="filter-select"
          value={tagFilter}
          onChange={(e) => onTagChange(e.target.value)}
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
      </div>

      {(statusFilter || tagFilter) && (
        <button
          className="filter-clear"
          onClick={() => {
            onStatusChange("");
            onTagChange("");
          }}
        >
          Clear Filters
        </button>
      )}
    </section>
  );
}
