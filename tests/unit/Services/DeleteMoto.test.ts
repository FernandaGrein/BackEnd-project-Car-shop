import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorCycle from '../../../src/Domains/Motorcycle';
import MotoServices from '../../../src/Services/MotoServices';
import INvalidIdError from '../../../src/Middlewares/InvalidIdError';
import NotFoundError from '../../../src/Middlewares/NotFoundError';

describe('testa se é possível deletar uma motocicleta', function () {
  it('testa se é possível deletar uma motocicleta com sucesso', async function () {
    const MotoInstance: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const outputMoto = new MotorCycle(MotoInstance);

    sinon.stub(Model, 'findByIdAndDelete').resolves(MotoInstance);

    const service = new MotoServices();
    const result = await service.deleteMotoById('6348513f34c397abcad040b2');
    
    expect(result).to.be.deep.equal(outputMoto);
  });

  it('testa que não é possível deletar uma motocicleta com id inválido', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(false);

    try {
      const service = new MotoServices();
      await service.deleteMotoById('59438fbea2f');
    } catch (error) {
      expect((error as INvalidIdError).message).to.be.equal('Invalid mongo id'); 
    }
  });
  it('testa se quando não for encontrado uma motocicleta um erro é lançado', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    try {
      const service = new MotoServices();
      await service.deleteMotoById('634853326a35b59438fbea2f');
    } catch (error) {
      expect((error as NotFoundError).message).to.be.equal('Motorcycle not found'); 
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});