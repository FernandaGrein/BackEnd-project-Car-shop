import { Model } from 'mongoose';
import { expect } from 'chai';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('testa se é possível buscar um carro no banco de dados', function () {
  it('testa se é possível buscar um carro com sucesso pelo Id', async function () {
    const CarInstance: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const outputCars = new Car(CarInstance);
    Sinon.stub(Model, 'findOne').resolves(CarInstance);
    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(outputCars);
  });
});