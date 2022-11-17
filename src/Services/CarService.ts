import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car';

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
}

export default CarService;