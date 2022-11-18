import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
carRoutes.get('/cars', (req, res, next) => new CarController(req, res, next).getAllCars());
carRoutes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
carRoutes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateCarById());

export default carRoutes;