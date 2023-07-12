import express from "express";
import carController from "../controllers/carController";

const router = express.Router();

router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.post("/", carController.createCar);
router.patch("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

export default router;
