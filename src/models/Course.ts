import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
    language: string;
    format: string;
    price: number;
    description: string;
}

export const CourseSchema = new Schema({
    language: { type: String, required: true },
    format: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

CourseSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
});

export default model<ICourse>("Course", CourseSchema);
