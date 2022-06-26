import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { prisma } from "../index";

export interface User {
  id: number;
  username: string;
  name: string;
  surnames: string;
  password: string;
  isAdmin: boolean;
}

interface IJWT {
  user: {
    username: string;
    name: string;
    surnames: string;
    isAdmin: boolean;
  };
  iat: string;
  exp: string;
}

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IJWT, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: payload.user.username },
      });
      if (user) {
        done(null, user);
      } else {
        done({ code: "403" }, false);
      }
    } catch (e) {
      done(e, false);
    }
  }
);

passport.use(jwtStrategy);

export const authJwt = passport.authenticate("jwt", {
  session: false,
});
