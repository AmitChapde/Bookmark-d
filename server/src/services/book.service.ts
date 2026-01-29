import Book from "../models/book.model";
import { createBookInput, updateBookInput } from "../types/book.types";

const createBook = async ({
  title,
  author,
  tags,
  createdBy,
}: createBookInput) => {
  const newBook = await Book.create({ title, author, tags, createdBy });
  return newBook;
};

const updateBook = async ({
  bookId,
  createdBy,
  updateData,
}: {
  bookId: string;
  createdBy: string;
  updateData: updateBookInput;
}) => {
  const updatedBook = await Book.findOneAndUpdate(
    {
      _id: bookId,
      createdBy,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedBook;
};

const getBookById = async (bookId: string, userId: string) => {
  const book = await Book.findOne({ _id: bookId, createdBy: userId });
  return book;
};

const getAllBooksByUserId = async (
  userId: string,
  filters: { status?: string; tag?: string } = {},
) => {
  const query: any = { createdBy: userId };

  if (filters.status) query.status = filters.status;
  if (filters.tag) query.tags = filters.tag;

  return await Book.find(query).sort({ createdAt: -1 });    
};

const deleteBookById = async (bookId: string, userId: string) => {
  const book = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });
  return book;
};

export {
  createBook,
  updateBook,
  getBookById,
  getAllBooksByUserId,
  deleteBookById,
};
