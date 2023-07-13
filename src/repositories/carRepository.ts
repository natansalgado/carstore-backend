import { Car, ICar } from "../models/Car";
import { User } from "../models/User";

const getCars = async (): Promise<ICar[]> => {
  const cars = await Car.find();
  return cars;
};

const getCar = async (id: string): Promise<ICar | Error> => {
  const car = await Car.findById(id);

  if (!car) return new Error("Car doesn't exists.");

  return car;
};

const createCar = async (car: ICar): Promise<ICar | Error> => {
  if (!(await User.findById(car.owner)))
    return new Error("User doesn't exists");

  if (car.modifications.length <= 0) car.modifications = ["N/A"];
  if (car.damaged_parts.length <= 0) car.damaged_parts = ["N/A"];

  const newCar = new Car(car);
  await newCar.save();
  return newCar;
};

const updateCar = async (id: string, newCar: ICar): Promise<ICar | Error> => {
  const car = await Car.findById(id);

  if (!car) return new Error("Car doesn't exists.");

  await car.updateOne(newCar);

  return newCar;
};

const deleteCar = async (id: string): Promise<ICar | Error> => {
  const car = await Car.findById(id);

  if (!car) return new Error("Car doesn't exists.");

  await car.deleteOne();

  return car;
};

export default {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
