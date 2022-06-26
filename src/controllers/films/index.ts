import { Request, Response } from "express";
import { User } from "../../middleware/authentication";
import { prisma } from "../../index";

export const getFilms = async (req: Request, res: Response) => {
  const user = req.user as User;
  const pres = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      rentedMovies: {
        include: {
          movie: {
            include: {
              director: true,
            },
          },
        },
      },
    },
  });

  res.send(pres?.rentedMovies);
};
