import { User, IUser } from "../models/User";
import { Car, ICar } from "../models/Car";

interface IUserAndCars extends IUser {
  cars: ICar[];
}

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

const getUser = async (id: string): Promise<IUserAndCars | Error> => {
  const user = await User.findById(id);
  const userCars = await Car.find({ owner: id });
  let userCopy;

  if (!user) return new Error("User doesn't exists.");
  if (userCars) {
    userCopy = JSON.parse(JSON.stringify(user));
    userCopy.cars = userCars;
  }

  console.log("aaaaa");
  return userCopy;
};

const createUser = async (user: IUser): Promise<IUser | Error> => {
  if (await User.findOne({ name: user.name })) {
    return new Error("User already exists.");
  }

  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

const updateUser = async (id: string, name: string): Promise<IUser | Error> => {
  const user = await User.findById(id);

  if (!user) return new Error("User doesn't exists.");

  user.name = name;
  await User.findByIdAndUpdate(id, user);
  return user;
};

const deleteUser = async (id: string): Promise<IUser | Error> => {
  const user = await User.findById(id);
  const userCars = await Car.find({ owner: id });

  if (!user) return new Error("User doesn't exists.");

  if (userCars) {
    userCars.forEach((car) => {
      car.deleteOne();
    });
  }

  await User.deleteOne({ _id: id });
  return user;
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
