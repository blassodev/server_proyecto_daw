import { Router } from "express";
import { checkAdmin } from "../utils/roles";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/books/admin";
import { getBooks } from "../controllers/books";

export const booksRouter = Router();

booksRouter.get("/", getBooks);

booksRouter.get("/admin", checkAdmin, getAllBooks);
booksRouter.post("/admin", checkAdmin, createBook);
booksRouter.put("/admin/:id", checkAdmin, updateBook);
booksRouter.delete("/admin/:id", checkAdmin, deleteBook);
