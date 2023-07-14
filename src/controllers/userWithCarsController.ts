import { Request, Response, NextFunction } from "express";
import userWithCarsRepository from "../repositories/userWithCarRepository";

const getUsersWithCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await userWithCarsRepository.getUsersWithCars();

  return res.json(result);
};

export default {
  getUsersWithCars,
};
