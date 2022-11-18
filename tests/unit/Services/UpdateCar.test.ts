import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import NotFoundError from '../../../src/Middlewares/NotFoundError';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';

describe('testa se é possível atualizar um carro', function () {
  it('testa se é possível atualizar um carro com sucesso', async function () {
    const InputCar: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const CarInstance: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const OutputCar = new Car(CarInstance);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(CarInstance);

    const service = new CarService();
    const result = await service.updateCarbyId('634852326b35b59438fbea2f', InputCar);
    
    expect(result).to.be.deep.equal(OutputCar);
  });

  it('testa se quando não for encontrado um carro um erro é lançado', async function () {
    const InputCar: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new CarService();
      await service.updateCarbyId('634853326a35b59438fbea2f', InputCar);
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Car not found'); 
    }
  });

  it('testa que não é possível atualizar um carro com id inválido', async function () {
    const InputCar: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new CarService();
      await service.updateCarbyId('59438fbea2f', InputCar);
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});