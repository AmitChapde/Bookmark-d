import { Request, Response } from "express";
import {
  createBook,
  updateBook,
  deleteBookById,
  getAllBooksByUserId,
  getBookById,
} from "../services/book.service";

const createBookController = async (req: Request, res: Response) => {
  try {
    const { title, author, tags } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const newBook = await createBook({
      title,
      author,
      tags,
      createdBy: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        newBook,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating User" });
  }
};

const updateBookController = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId as string;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const updatedBook = await updateBook({
      bookId,
      createdBy: req.user._id.toString(),
      updateData: req.body,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ message: "Book not found or unauthorized" });
    }

    res.status(200).json({ status: "success", data: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

const getBookByIdController = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId as string;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const book = await getBookById(bookId, req.user._id.toString());

    if (!book) {
      return res.status(400).json({
        status: "failure",
        message: "Book not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Book" });
  }
};

const getAllBooksController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const filters = {
      status: req.query.status as string,
      tag: req.query.tag as string,
    };
    const books = await getAllBooksByUserId(req.user._id.toString(), filters);
    res
      .status(200)
      .json({ status: "success", results: books.length, data: books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching library" });
  }
};

const deleteBookController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const bookId = req.params.bookId as string;

    const deletedBook = await deleteBookById(bookId, req.user._id.toString());

    if (!deletedBook) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found or you do not have permission to delete it.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting book",
    });
  }
};
export {
  createBookController,
  updateBookController,
  getBookByIdController,
  getAllBooksController,
  deleteBookController,
};
