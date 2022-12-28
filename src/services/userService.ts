import { ICourse } from "../models/Course";
import User, { IUser } from "../models/User";

export async function getUsersService() {
  return await User.find().populate("courses");
}

export async function getUserService(id: string) {
  return await User.findById(id).populate({ path: "courses", model: "Course" });
}

export async function getUsernameService(username: string) {
  return await User.findOne({ username: username }).populate({ path: "courses", model: "Course" });
}

export async function getEmailService(email: string) {
  return await User.findOne({ email: email });
}

export async function createUserService(user: IUser) {
  return await user.save();
}

export async function updateUserService(id: string, user: IUser) {
  return await User.findByIdAndUpdate(id, user, { new: true });
}

export async function deleteUserService(id: string) {
  return await User.findByIdAndDelete(id);
}

export async function addCourseService(id: string, course: ICourse) {
  const user = await getUserService(id);
  
  user?.courses.push(course.id);
  user?.save();
  return user;
}