import { Request, Response } from "express";
import { User } from "../../middleware/authentication";
import { prisma } from "../../index";

export const getBooks = async (req: Request, res: Response) => {
  const user = req.user as User;

  const books = await prisma.rentedBook.findMany({
    where: {
      userId: user.id,
    },
    include: {
      author: true,
    },
  });

  res.json(books);
};
