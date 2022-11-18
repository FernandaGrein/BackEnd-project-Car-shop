import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class MotorCycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(moto: IMotorcycle) {
    super(moto);
    this.category = moto.category;
    this.engineCapacity = moto.engineCapacity;
  }

  public getcategory() {
    return this.category;
  }

  public getengineCapacity() {
    return this.engineCapacity;
  }

  public setcategory(value: string) {
    this.category = value;
  }

  public setengineCapacity(value: number) {
    this.engineCapacity = value;
  }
}

export default MotorCycle;