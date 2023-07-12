import { Request, Response, NextFunction } from "express";
import carRepository from "../repositories/carRepository";
import { isValidObjectId } from "mongoose";

const getCars = async (req: Request, res: Response, next: NextFunction) => {
  const result = await carRepository.getCars();
  return res.json(result);
};

const getCar = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format");

  const result = await carRepository.getCar(id);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  const car = req.body;

  if (!isValidObjectId(car.owner))
    return res.status(400).json("Invalid ID format.");

  const result = await carRepository.createCar(car);

  if (result instanceof Error) return res.status(400).json(result.message);
  return res.status(201).json(result);
};

const updateCar = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const car = req.body;

  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format.");

  const result = await carRepository.updateCar(id, car);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format");

  const result = await carRepository.deleteCar(id);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

export default {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
