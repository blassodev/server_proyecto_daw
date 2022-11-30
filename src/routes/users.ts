import { Router } from "express";
import { checkAdmin } from "../utils/roles";
import { createUser, deleteUser, getUsers } from "../controllers/users";

export const usersRouter = Router();

usersRouter.get("/", checkAdmin, getUsers);
usersRouter.post("/", checkAdmin, createUser);
usersRouter.delete("/:id", checkAdmin, deleteUser);
