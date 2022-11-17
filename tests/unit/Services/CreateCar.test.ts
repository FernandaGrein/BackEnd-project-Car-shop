import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

describe('testa se é possível criar um carro', function () {
  it('testa se é possível criar um carro com sucesso', async function () {
    const InputCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const CarInstance: ICar = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const OutputCar = new Car(CarInstance);

    sinon.stub(Model, 'create').resolves(CarInstance);

    const service = new CarService();
    const result = await service.creatCar(InputCar);
    
    expect(result).to.be.deep.equal(OutputCar);
  });
});