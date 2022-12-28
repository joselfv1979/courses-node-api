import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { getUsernameService } from "../services/userService";

interface LoginRequest {
  username: string,
  password: string
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password){
      throw new CustomError(400, "Bad request");
    }

    const user = await getUsernameService(username);

    if(!user){
      throw new CustomError(404, "User not found");
    }

    const passwordCorrect = await bcrypt.compare(String(password), user.passwordHash);

    if (!passwordCorrect) {
      throw new CustomError(401, "Invalid credentials");
    }

    const token = generateToken(user.id, username, JSON.stringify(user.roles));

    res.status(200).json({
      id: user.id,
      username,
      roles: user.roles,
      token,
    });
  } catch (error) {
    next(error);
  }
}
