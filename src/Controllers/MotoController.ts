import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoServices from '../Services/MotoServices';

class MotorController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotoServices;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotoServices();
  }

  public async createMoto() {
    const motoObj: IMotorcycle = this.req.body;

    try {
      const newMoto = await this.service.createMoto(motoObj);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorController;