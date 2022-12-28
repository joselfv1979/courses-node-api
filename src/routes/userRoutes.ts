import { Router } from "express";

import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  addCourseToUserController,
} from "../controllers/userController";
import authHandler from "../middlewares/authHandler";
import checkId from "../middlewares/checkIdHandler";

const usersRouter = Router();

usersRouter.get("/:id", authHandler, checkId, getUserController);
usersRouter.get("/", authHandler, getUsersController);
usersRouter.post("/", createUserController);
usersRouter.put("/:id", authHandler, checkId, updateUserController);
usersRouter.delete("/:id", authHandler, checkId, deleteUserController);
usersRouter.post("/addCourse/:id", authHandler, addCourseToUserController);

export default usersRouter;
