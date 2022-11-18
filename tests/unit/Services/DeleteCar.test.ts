import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';
import NotFoundError from '../../../src/Middlewares/NotFoundError';

describe('testa se é possível deletar um carro', function () {
  it('testa se é possível deletar um carro com sucesso', async function () {
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

    sinon.stub(Model, 'findByIdAndDelete').resolves(CarInstance);

    const service = new CarService();
    const result = await service.deleteCarById('6348513f34c397abcad040b2');
    
    expect(result).to.be.deep.equal(OutputCar);
  });

  it('testa que não é possível deletar um carro com id inválido', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(false);

    try {
      const service = new CarService();
      await service.deleteCarById('59438fbea2f');
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });
  it('testa se quando não for encontrado um carro um erro é lançado', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    try {
      const service = new CarService();
      await service.deleteCarById('634853326a35b59438fbea2f');
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Car not found'); 
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});