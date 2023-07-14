import express from "express";
import userWithCarsController from "../controllers/userWithCarsController";

const router = express.Router();

router.get("/", userWithCarsController.getUsersWithCars);

export default router;
