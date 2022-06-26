import { Request, Response } from "express";
import { prisma } from "../index";
import { Author } from "./books/admin";

export const getAuthors = async (_, res: Response) => {
  const authors = await prisma.bookAuthor.findMany();
  res.json(authors);
};

export const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as Author;
  const created = await prisma.bookAuthor.create({
    data: {
      name,
      bio,
      age,
      surnames,
    },
  });

  res.json(created);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { name, bio, age, surnames } = req.body as Partial<Author>;

  const updated = await prisma.bookAuthor.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name,
      bio,
      age,
      surnames,
    },
  });

  res.json(updated);
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const deleted = await prisma.bookAuthor.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.send(deleted);
};
