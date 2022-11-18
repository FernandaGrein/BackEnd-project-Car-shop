import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';
import NotFoundError from '../../../src/Middlewares/NotFoundError';

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
    sinon.stub(Model, 'findOne').resolves(CarInstance);
    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');
    expect(result).to.be.deep.equal(outputCars);
  });

  it('testa que não é possível criar um carro com id inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);

    try {
      const service = new CarService();
      await service.getCarById('59438fbea2f');
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });
  it('testa se quando não for encontrado um carro um erro é lançado', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    try {
      const service = new CarService();
      await service.getCarById('634853326a35b59438fbea2f');
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Car not found'); 
    }
  });

  it('testa se é possível buscar todos os carros com sucesso', async function () {
    const carInstace: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    const outputCars = carInstace.map((item) => new Car(item));

    sinon.stub(Model, 'find').resolves(outputCars);
    const service = new CarService();
    const result = await service.getAllCars();
    expect(result).to.be.deep.equal(outputCars);
  });

  afterEach(function () {
    sinon.restore();
  });
});