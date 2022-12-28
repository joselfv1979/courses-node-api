import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";

export interface AuthRequest extends Request {
  token?: string | JwtPayload;
}

const authHandler = (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {    
    const token = request.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.SECRET as string);

    request.token = decoded;
    next();
  } catch (error) {
    next(new CustomError(401, "token missing or invalid"));
  }
};

export default authHandler;
