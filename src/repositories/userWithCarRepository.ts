import { User, IUser } from "../models/User";
import { Car, ICar } from "../models/Car";

interface IUserWithCars extends IUser {
  cars: ICar[];
}

const getUsersWithCars = async (): Promise<IUserWithCars[]> => {
  const users: IUserWithCars[] = [];
  const userRepo = await User.find().sort({ name: 1 });

  await Promise.all(
    userRepo.map(async (user) => {
      const cars = await Car.find({ owner: user._id }).sort({ brand: 1 });
      users.push({
        _id: user._id,
        name: user.name,
        created_at: user.created_at,
        cars: cars,
      });
    })
  );

  return users;
};

export default {
  getUsersWithCars,
};
