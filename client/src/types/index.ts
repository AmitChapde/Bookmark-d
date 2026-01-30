export type BookStatus = "TO_READ" | "READING" | "COMPLETED";

export type Book = {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};
