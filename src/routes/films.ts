import { Router } from "express";
import { getFilms } from "../controllers/films";
import {
  deleteFilm,
  getAllFilms,
  postNewFilm,
  updateFilm,
} from "../controllers/films/admin";
import { checkAdmin } from "../utils/roles";

export const filmsRouter = Router();

filmsRouter.get("/", getFilms);

filmsRouter.get("/admin", checkAdmin, getAllFilms);
filmsRouter.post("/admin", checkAdmin, postNewFilm);
filmsRouter.put("/admin/:id", checkAdmin, updateFilm);
filmsRouter.delete("/admin/:id", checkAdmin, deleteFilm);
