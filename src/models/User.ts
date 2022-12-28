import { Schema, model, Document } from "mongoose";
import { ICourse } from "./Course";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: string[];
  imagePath: string;
  courses: Array<ICourse>;
}

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], required: true },
  imagePath: { type: String },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default model<IUser>("User", UserSchema);
