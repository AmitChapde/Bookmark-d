import { Document ,Types} from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  tags: string[];
  status: "TO_READ" | "READING" | "COMPLETED";
  createdBy:Types.ObjectId
}


export interface createBookInput{
    title:string,
    author:string,
    tags:string[],
    createdBy:Types.ObjectId
}


export interface updateBookInput{
    title:string,
    author:string,
    tags:string[]
    status: "TO_READ" | "READING" | "COMPLETED";
}