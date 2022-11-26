import { Router } from "express";
import { checkAdmin } from "../utils/roles";
import { getUsers } from "../controllers/users";

export const usersRouter = Router();

usersRouter.get("/", checkAdmin, getUsers);
