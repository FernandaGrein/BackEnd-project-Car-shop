import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import NotFoundError from '../../../src/Middlewares/NotFoundError';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorCycle from '../../../src/Domains/Motorcycle';
import MotoServices from '../../../src/Services/MotoServices';

describe('testa se é possível atualizar uma moto', function () {
  const INPUTMOTO: IMotorcycle = {
    model: 'Honda Cb 600f Hornet',
    year: 2014,
    color: 'Red',
    status: true,
    buyValue: 45.000,
    category: 'Street',
    engineCapacity: 600,
  };
  it('testa se é possível atualizar uma moto com sucesso', async function () {
    const motoInstance: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const outputMoto = new MotorCycle(motoInstance);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoInstance);

    const service = new MotoServices();
    const result = await service.updateMotobyId('634852326b35b59438fbea2f', INPUTMOTO);
    
    expect(result).to.be.deep.equal(outputMoto);
  });

  it('testa se quando não for encontrada uma moto um erro é lançado', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const service = new MotoServices();
      await service.updateMotobyId('634853326a35b59438fbea2f', INPUTMOTO);
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Motorcycle not found'); 
    }
  });

  it('testa que não é possível atualizar um carro com id inválido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new MotoServices();
      await service.updateMotobyId('59438fbea2f', INPUTMOTO);
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});