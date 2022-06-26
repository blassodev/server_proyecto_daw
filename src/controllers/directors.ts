import { Request, Response } from "express";
import { prisma } from "../index";

export interface Director {
  name: string;
  surnames: string;
  bio: string;
  age: number;
}

export const getAllDirectors = async (_, res: Response) => {
  const directors = await prisma.movieDirector.findMany();
  res.json(directors);
};

export const createDirector = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as Director;
  const director = await prisma.movieDirector.create({
    data: {
      name,
      bio,
      age,
      surnames,
    },
  });

  res.json(director);
};

export const updateDirector = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as Partial<Director>;
  const updated = await prisma.movieDirector.update({
    data: {
      name,
      bio,
      age,
      surnames,
    },
    where: { id: parseInt(req.params.id) },
  });

  res.json(updated);
};

export const deleteDirector = async (req: Request, res: Response) => {
  const deleted = await prisma.movieDirector.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(deleted);
};
