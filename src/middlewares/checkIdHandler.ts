import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CustomError } from "../models/CustomError";

// Middleware to check a valid ObjectId
const checkId = (req: Request, response: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {    
    throw new CustomError(400, "Bad request");
  }
  next();
};

export default checkId;
