import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { User, count, createOne, getOne } from "../models/user.model";
import { comparePassword, hash, hashToken } from "../common/utils";
import createHttpError from "http-errors";

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const hashedPassword: string = user?.passwordHash || "";

    if (comparePassword(password, hashedPassword)) {
      const loginCookie = jwt.sign({ user }, process.env.TOKEN_SEED || "", {
        expiresIn: "1h",
      });

      res.cookie("login-token", loginCookie, { httpOnly: true, secure: true });

      var result = {
        username: user?.username,
        id: user?.id,
        loginToken: loginCookie,
      };
    } else {
      throw createHttpError(401, "Invalid username or password");
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("login-token");
    res.clearCookie("ws-token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function register(req: Request, res: Response) {
  try {
    const user = {
      username: req.body.username,
      passwordHash: hash(req.body.password),
      active: true,
      id: (await count()) + 1,
    };

    const created = await createOne(user);

    if (!created) {
      throw createHttpError(403, "User not created");
    }

    const cookie = jwt.sign({ user }, process.env.TOKEN_SEED || "", {
      expiresIn: "1h",
    });
    res.cookie("login-token", cookie);

    res.status(200).json({
      success: true,
      message: created,
      result: {
        username: user.username,
        id: user.id,
        loginToken: cookie,
      },
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function verify(req: Request, res: Response) {
  try {
    const { token } = req.body;

    const decodedUser: JwtPayload = jwt.verify(
      token,
      process.env.TOKEN_SEED || "" //@ts-ignore
    ).user;
    const user = await getOne(decodedUser.id || "");

    if (!user) {
      throw createHttpError(401, "Invalid token");
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: error,
    });
  }
}

export { login, logout, register, verify };
