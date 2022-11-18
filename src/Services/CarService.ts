import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import INvalidIdError from '../Middlewares/InvalidIdError';
import NotFoundError from '../Middlewares/NotFoundError';
import CarODM from '../Models/CarODM';

const NOT_FOUND = 'Car not found';
const INVALID_ID = 'Invalid mongo id';

class CarService {
  public createCarDomain(carObj: ICar): Car {
    return new Car(carObj);
  }

  public async creatCar(carObj: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(carObj);
    
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const carOdm = new CarODM();
    const carsfromMongo = await carOdm.findAll();

    const cars = carsfromMongo.map((item) => this.createCarDomain(item));
    return cars;
  }

  public async getCarById(id: string) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);
    
    const carOdm = new CarODM();
    const carById = await carOdm.findById(id) as ICar;

    if (carById === null) throw new NotFoundError(NOT_FOUND);

    return this.createCarDomain(carById);
  }

  public async updateCarbyId(id: string, carToUpdate: ICar) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);
    
    const carOdm = new CarODM();
    const updatedCar = await carOdm.updateById(id, carToUpdate);
    
    if (updatedCar === null) throw new NotFoundError(NOT_FOUND);

    return this.createCarDomain(updatedCar);
  }

  public async deleteCarById(id: string) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);

    const carOdm = new CarODM();
    const deletedCar = await carOdm.deleteById(id);

    if (!deletedCar) throw new NotFoundError(NOT_FOUND);

    return this.createCarDomain(deletedCar);
  }
}

export default CarService;