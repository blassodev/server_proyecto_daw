import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

interface ILoginRequestBody {
  user: string;
  password: string;
}

export const login = async (req: Request<ILoginRequestBody>, res: Response) => {
  if (!req.body.user || !req.body.password) {
    res.status(400).json({
      status: "error",
      error: "Se requiere usuario y contraseña",
    });
    return;
  }

  const cryptoPassword = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: { username: req.body.user, password: cryptoPassword },
    select: {
      username: true,
      name: true,
      surnames: true,
      isAdmin: true,
    },
  });

  if (!user) {
    res.status(401).json({
      status: "error",
      error: "Nombre de usuario o contraseña incorrectos",
    });
    return;
  }

  const token = jwt.sign({ user }, process.env.JWT_KEY || "", {
    expiresIn: "12h",
  });

  res.json({
    status: "ok",
    token,
  });
};
