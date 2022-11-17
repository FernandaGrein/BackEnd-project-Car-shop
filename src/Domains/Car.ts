import ICar from '../Interfaces/ICar';

class Car {
  private doorsQty: number;
  private seatsQty: number;
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.color = car.color;
    this.year = car.year;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }

  public getseatsQty() {
    return this.seatsQty;
  }

  public setDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public setSeatsQty(value: number) {
    this.seatsQty = value;
  }
}

export default Car;