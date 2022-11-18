import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const carObj: ICar = this.req.body;

    try {
      const newCar = await this.service.creatCar(carObj);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error); 
    }
  }

  public async getAllCars() {
    const cars = await this.service.getAllCars();
    return this.res.status(200).json(cars);
  }

  public async getCarById() {
    const { id } = this.req.params;

    try {
      const car = await this.service.getCarById(id);
      return this.res.status(200).json(car); 
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCarById() {
    const { id } = this.req.params;
    const { body } = this.req;

    try {
      const updatedCar = await this.service.updateCarbyId(id, body);
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteCarById() {
    const { id } = this.req.params;

    try {
      await this.service.deleteCarById(id);
      return this.res.sendStatus(204);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;