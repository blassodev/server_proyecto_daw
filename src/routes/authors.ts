import { Router } from "express";
import { checkAdmin } from "../utils/roles";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../controllers/authors";

export const authorsRouter = Router();

authorsRouter.get("/", checkAdmin, getAuthors);
authorsRouter.post("/", checkAdmin, createAuthor);
authorsRouter.put("/:id", checkAdmin, updateAuthor);
authorsRouter.delete("/:id", checkAdmin, deleteAuthor);
