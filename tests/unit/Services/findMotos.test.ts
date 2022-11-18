import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';
import NotFoundError from '../../../src/Middlewares/NotFoundError';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorCycle from '../../../src/Domains/Motorcycle';
import MotoServices from '../../../src/Services/MotoServices';

describe('testa se é possível buscar uma motocicleta no banco de dados', function () {
  it('testa se é possível buscar uma motocicleta com sucesso pelo Id', async function () {
    const motoInstance: IMotorcycle = {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    const outputMoto = new MotorCycle(motoInstance);
    sinon.stub(Model, 'findOne').resolves(motoInstance);
    const service = new MotoServices();
    const result = await service.getMotoById('634852326b35b59438fbea31');
    expect(result).to.be.deep.equal(outputMoto);
  });

  it('testa que não é possível criar uma motocicleta com id inválido', async function () {
    sinon.stub(Model, 'findOne').resolves(false);

    try {
      const service = new MotoServices();
      await service.getMotoById('59438fbea2f');
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });
  it('testa se quando não for encontrado uma motocicleta um erro é lançado', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    try {
      const service = new MotoServices();
      await service.getMotoById('634853326a35b59438fbea2f');
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Motorcycle not found'); 
    }
  });

  it('testa se é possível buscar todas as motocicletas com sucesso', async function () {
    const motoInstance: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    const outputMoto = motoInstance.map((item) => new MotorCycle(item));

    sinon.stub(Model, 'find').resolves(outputMoto);
    const service = new MotoServices();
    const result = await service.getAllMotos();
    expect(result).to.be.deep.equal(outputMoto);
  });

  afterEach(function () {
    sinon.restore();
  });
});