import { Response } from "express";
import { prisma } from "../index";

export const getUsers = async (_, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      surnames: true,
      isAdmin: true,
    },
  });
  res.json(users);
};
