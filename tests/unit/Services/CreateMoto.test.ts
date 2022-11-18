import { Model } from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorCycle from '../../../src/Domains/Motorcycle';
import MotoServices from '../../../src/Services/MotoServices';

describe('testa se é possível criar uma motocicleta', function () {
  it('testa se é possível criar uma motocicleta com sucesso', async function () {
    const InputMoto: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

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

    const OutputCar = new MotorCycle(MotoInstance);

    sinon.stub(Model, 'create').resolves(MotoInstance);

    const service = new MotoServices();
    const result = await service.createMoto(InputMoto);
    
    expect(result).to.be.deep.equal(OutputCar);

    sinon.restore();
  });
});