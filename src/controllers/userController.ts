import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../models/CustomError";
import bcrypt from "bcrypt";

import {
  getUserService,
  getUsersService,
  getUsernameService,
  getEmailService,
  createUserService,
  updateUserService,
  deleteUserService,
  addCourseService,
} from "../services/userService";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await getUserService(id);

    if (!user) {
      throw next(new CustomError(404, "User not found"));
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password, roles } = req.body;
    
    if (!fullname || !username || !email || !password || !roles) {
      throw new CustomError(400, "Bad request");
    }

    const usernameExists = await getUsernameService(username);
    if (usernameExists) {
      throw new CustomError(409, "Username already exists");
    }

    const emailExists = await getEmailService(email);
    if (emailExists) {
      throw new CustomError(409, "Email address already exists");
    }

    const SaltRounds = 10;
    const passwordHash = await bcrypt.hash(password, SaltRounds);
    const newUser: IUser = new User({
      fullname,
      username,
      email,
      passwordHash,
      roles,
    });

    const response = await createUserService(newUser);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { fullname, username, email } = req.body;

    if (!id || !fullname || !username || !email) {
      throw new CustomError(400, "Bad request");
    }
    
    const user = await updateUserService(id, req.body);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await deleteUserService(id);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function addCourseToUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    
    const course = req.body;
    
    const user = await addCourseService(id, course);

    if (!user) {
      throw new CustomError(404, "User not found");
    } 
    
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
