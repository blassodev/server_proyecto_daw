import { Request, Response } from "express";
import { prisma } from "../../index";
import { Director } from "../directors";

interface NewFilmResquest {
  name: string;
  year: number;
  score: number;
  imageUrl: string;
  directorId?: number;
  director?: Director;
}

interface UpdateFilmBody extends Partial<NewFilmResquest> {}

export const getAllFilms = async (_, res: Response) => {
  const movies = await prisma.rentedMovie.findMany({
    include: {
      users: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              surnames: true,
              isAdmin: true,
            },
          },
        },
      },
      director: true,
    },
  });

  res.status(200).json(movies);
};

export const postNewFilm = async (req: Request, res: Response) => {
  const { name, year, score, imageUrl, directorId, director } =
    req.body as NewFilmResquest;
  if (!director && !directorId) {
    res.status(400).json({
      status: "error",
      msg: "Se debe proporcionar un director",
    });
    return;
  } else if (director && directorId) {
    res.status(400).json({
      status: "error",
      msg: "Error interno",
    });
    return;
  } else if (directorId) {
    const movie = await prisma.rentedMovie.create({
      data: {
        name,
        year,
        score,
        imageUrl,
        movieDirectorId: directorId,
      },
    });
    res.status(201).json(movie);
    return;
  } else if (director) {
    const movie = await prisma.rentedMovie.create({
      data: {
        name,
        year,
        score,
        imageUrl,
        director: {
          create: director,
        },
      },
    });

    res.status(201).json(movie);
    return;
  }
  res.status(500).json({
    status: "error",
    msg: "Error interno",
  });
};

export const updateFilm = async (req: Request, res: Response) => {
  const { name, year, score, imageUrl, directorId } =
    req.body as UpdateFilmBody;
  const movie = await prisma.rentedMovie.update({
    data: {
      name,
      year,
      score,
      imageUrl,
      movieDirectorId: directorId,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json(movie);
};

export const deleteFilm = async (req: Request, res: Response) => {
  const deleted = await prisma.rentedMovie.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(202).json(deleted);
};
