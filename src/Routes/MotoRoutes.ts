import { Router } from 'express';
import MotorController from '../Controllers/MotoController';

const motoRoutes = Router();

motoRoutes.post('/', (req, res, next) => new MotorController(req, res, next).createMoto());
motoRoutes.get('/', (req, res, next) => new MotorController(req, res, next).getAllMotos());
motoRoutes.get('/:id', (req, res, next) => new MotorController(req, res, next).getMotoById());
motoRoutes.put('/:id', (req, res, next) => new MotorController(req, res, next).updateMotoById());
motoRoutes.delete('/:id', (req, res, next) => new MotorController(req, res, next).deleteMotoById());

export default motoRoutes;