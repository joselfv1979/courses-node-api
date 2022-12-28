import { NextFunction, Request, Response } from "express";
import Course, { ICourse } from "../models/Course";
import { CustomError } from "../models/CustomError";

import {
    getCourseService,
    getCoursesService,
    createCourseService,
    updateCourseService,
    deleteCourseService,
  } from "../services/courseService";

  export async function getCoursesController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const courses = await getCoursesService();
      res.json(courses);
    } catch (error) {
      next(new CustomError(500, "Couldn't fetch courses, try it later"));
    }
  }
  
  export async function getCourseController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
  
      const course = await getCourseService(id);

      if(!course){
        throw new CustomError(404, "Course not found");
      }
  
      res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  }
  
  export async function createCourseController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { language, format, price, description } = req.body;
      
      if (!language || !format || !price || isNaN(price) || !description) {
        throw new CustomError(400, "Bad request");
      }
  
      const newCourse: ICourse = new Course({
        language,
        format,
        price,
        description,
      });
  
      const response = await createCourseService(newCourse);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  
  export async function updateCourseController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { language, format, price, description } = req.body;
  
      if (!id || !language || !format || !price || !description) {
        return next(new CustomError(400, "Bad request"));
      }
  
      const course = await updateCourseService(id, req.body);
  
      if (!course) {
        return next(new CustomError(404, "Course not found"));
      }
  
      res.status(201).json(course);
    } catch (error) {
      next(new CustomError(404, "Course not found"));
    }
  }
  
  export async function deleteCourseController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
  
      const course = await deleteCourseService(id);
      if (!course) {
        return next(new CustomError(404, "Course not found"));
      }
  
      return res.status(204).end();
    } catch (error) {
      next(new CustomError(404, "Course not found"));
    }
  }
  