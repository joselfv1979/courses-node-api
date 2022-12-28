import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err);
  
  if (err instanceof CustomError) {          
    res.status(err.status).json(err.message);
  } else {    
    res.status(500).json("Something went wrong");
  }
};