import { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/userRespository";
import { isValidObjectId } from "mongoose";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.getUsers();
  return res.json(users);
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format.");

  const result = await userRepository.getUser(id);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const result = await userRepository.createUser(user);

  if (result instanceof Error) return res.status(400).json(result.message);
  return res.status(201).json(result);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format.");
  if (!name) return res.status(400).json("Insert a name to update the user.");

  const result = await userRepository.updateUser(id, name);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json("Invalid ID format.");

  const result = await userRepository.deleteUser(id);

  if (result instanceof Error) return res.status(404).json(result.message);
  return res.json(result);
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
