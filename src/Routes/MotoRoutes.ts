import { Router } from 'express';
import MotorController from '../Controllers/MotoController';

const motoRoutes = Router();

motoRoutes.post(
  '/motorcycles', 
  (req, res, next) => new MotorController(req, res, next).createMoto(),
);

export default motoRoutes;