import { Request, Response } from "express";
import { prisma } from "../../index";
import { User } from "../../middleware/authentication";

export interface Author {
  name: string;
  surnames: string;
  bio: string;
  age: number;
}

export interface Book {
  name: string;
  author: Author;
  score: number;
  user?: User;
  imageUrl: string;
}

export interface CreateBookRequestBody {
  name: string;
  author?: Author;
  authorId: number;
  score: number;
  imageUrl: string;
}

export const getAllBooks = async (_, res: Response) => {
  const books = await prisma.rentedBook.findMany({
    include: {
      author: true,
      User: {
        select: {
          id: true,
          username: true,
          name: true,
          surnames: true,
          isAdmin: true,
        },
      },
    },
  });

  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const { name, score, imageUrl, author, authorId } =
    req.body as CreateBookRequestBody;
  if (!author && !authorId) {
    res.status(400).json({
      status: "error",
      msg: "Se debe proporcionar un autor",
    });
    return;
  } else if (author && authorId) {
    res.status(400).json({
      status: "error",
      msg: "Error interno",
    });
    return;
  } else if (authorId) {
    const book = await prisma.rentedBook.create({
      data: {
        name,
        score,
        imageUrl,
        authorId,
      },
    });
    res.status(201).json(book);
    return;
  } else if (author) {
    const book = await prisma.rentedBook.create({
      data: {
        name,
        score,
        imageUrl,
        author: {
          create: author,
        },
      },
    });

    res.status(201).json(book);
    return;
  }
  res.status(500).json({
    status: "error",
    msg: "Error interno",
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const { name, score, imageUrl, authorId } =
    req.body as Partial<CreateBookRequestBody>;
  const book = await prisma.rentedBook.update({
    data: {
      name,
      score,
      imageUrl,
      authorId,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const deleted = prisma.rentedBook.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(deleted);
};
