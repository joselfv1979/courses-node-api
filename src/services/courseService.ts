import Course, { ICourse } from "../models/Course";

export async function getCoursesService() {
  return await Course.find();
}

export async function getCourseService(id: string) {
  return await Course.findById(id);
}

export async function createCourseService(course: ICourse) {
  return await course.save();
}

export async function updateCourseService(id: string, course: ICourse) {
  return await Course.findByIdAndUpdate(id, course, { new: true });
}

export async function deleteCourseService(id: string) {
  return await Course.findByIdAndDelete(id);
}