/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { connectDB } from "./config/db";
import usersRouter from "./routes/userRoutes";
import coursesRouter from "./routes/courseRoutes";
import loginRouter from "./routes/loginRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "..", "/public")));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/login", loginRouter);

// Error handler middleware
app.use(errorHandler);

//connect to db
(async () => {
  await connectDB();

  console.log("Connected to the database successfully!");
})();

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
