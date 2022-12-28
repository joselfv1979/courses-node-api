import { Router } from "express";

import {
  getCourseController,
  getCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/courseController";
import authHandler from "../middlewares/authHandler";
import checkId from "../middlewares/checkIdHandler";

const coursesRouter = Router();

coursesRouter.get("/", getCoursesController);
coursesRouter.get("/:id", checkId, getCourseController);
coursesRouter.post("/", authHandler, createCourseController);
coursesRouter.put("/:id", authHandler, checkId, updateCourseController);
coursesRouter.delete("/:id", authHandler, checkId, deleteCourseController);

export default coursesRouter;