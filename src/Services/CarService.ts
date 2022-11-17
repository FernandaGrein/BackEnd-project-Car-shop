import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import INvalidIdError from '../Middlewares/InvalidIdError';
import NotFoundError from '../Middlewares/NotFoundError';
import CarODM from '../Models/CarODM';

class CarService {
  public createCarDomain(carObj: ICar): Car {
    return new Car(carObj);
  }

  public async creatCar(carObj: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(carObj);

    const carWithId = { id: newCar._id,
      model: newCar.model,
      year: newCar.year,
      color: newCar.color,
      status: newCar.status || false,
      buyValue: newCar.buyValue,
      doorsQty: newCar.doorsQty,
      seatsQty: newCar.seatsQty,
    };
    
    return this.createCarDomain(carWithId);
  }

  public async getAllCars() {
    const carOdm = new CarODM();
    const carsfromMongo = await carOdm.findAll();

    const cars = carsfromMongo.map((item) => this.createCarDomain(item));
    return cars;
  }

  public async getCarById(id: string) {
    if (!isValidObjectId(id)) throw new INvalidIdError('Invalid mongo id');
    
    const carOdm = new CarODM();
    const carById = await carOdm.findById(id) as ICar;

    if (carById === null) throw new NotFoundError('Car not found');

    const carWithId = { id: carById._id,
      model: carById.model,
      year: carById.year,
      color: carById.color,
      status: carById.status || false,
      buyValue: carById.buyValue,
      doorsQty: carById.doorsQty,
      seatsQty: carById.seatsQty,
    };
    return this.createCarDomain(carWithId);
  }
}

export default CarService;