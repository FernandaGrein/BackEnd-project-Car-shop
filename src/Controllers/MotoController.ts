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

  public async getAllMotos() {
    try {
      const allMotos = await this.service.getAllMotos();
      return this.res.status(200).json(allMotos);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotoById() {
    const { id } = this.req.params;
    try {
      const carById = await this.service.getMotoById(id);
      return this.res.status(200).json(carById);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMotoById() {
    const { id } = this.req.params;
    const { body } = this.req;

    try {
      const updatedMoto = await this.service.updateMotobyId(id, body);
      return this.res.status(200).json(updatedMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteMotoById() {
    const { id } = this.req.params;

    try {
      await this.service.deleteMotoById(id);
      return this.res.sendStatus(204);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorController;