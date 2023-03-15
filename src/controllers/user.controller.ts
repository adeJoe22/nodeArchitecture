import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/User.interface";
import UserModel from "../models/User.model";
import { AppError, HttpCode } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    const { email, name, password, confirmPassword } = req.body;

    const user = await UserModel.create({
      email,
      name,
      password,
      confirmPassword,
    });
    if (!user) {
      next(
        new AppError({
          message: "Account not created",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    return res.status(HttpCode.CREATED).json({
      message: "Success",
      data: user,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      next(
        new AppError({
          message: "Account does not exist",
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    await user?.comparePassword(password);
    return res.status(200).json({
      message: "Success",
      data: user,
    });
  }
);
