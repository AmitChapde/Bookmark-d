import mongoose from "mongoose";
import { IBook } from "../types/book.types";

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: [String],
    status: {
      type: String,
      enum: ["TO_READ", "READING", "COMPLETED"],
      default: "TO_READ",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
