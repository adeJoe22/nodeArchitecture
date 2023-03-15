import express, { Application, NextFunction, Response, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import { AppError, HttpCode } from "./utils/appError";
import api from "./api";

const appConfig = (app: Application) => {
  // middlewares
  app
    .use(express.json())
    .use(morgan("dev"))
    .use(cors())

    // api endpoint
    .use("/api", api)

    // catch not found routes
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    })
    // error handler
    .use(errorHandler);
};

export default appConfig;
