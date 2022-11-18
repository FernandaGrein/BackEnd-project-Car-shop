import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post('/', (req, res, next) => new CarController(req, res, next).create());
carRoutes.get('/', (req, res, next) => new CarController(req, res, next).getAllCars());
carRoutes.get('/:id', (req, res, next) => new CarController(req, res, next).getCarById());
carRoutes.put('/:id', (req, res, next) => new CarController(req, res, next).updateCarById());
carRoutes.delete('/:id', (req, res, next) => new CarController(req, res, next).deleteCarById());

export default carRoutes;
