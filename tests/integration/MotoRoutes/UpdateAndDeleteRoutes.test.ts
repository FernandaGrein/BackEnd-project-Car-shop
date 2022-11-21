import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { DELETEDMOTO, MOTOTOUPDATE, UPDATEDMOTO } from '../Mocks';

describe('testa as rotas Update e Delete de Motorcycle', function () {
  it('testa se é possivel editar uma motocicleta com sucesso', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(UPDATEDMOTO);

    const response = await request(app)
      .put('/motorcycles/634852326b35b59438fbea2f').send(MOTOTOUPDATE);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(UPDATEDMOTO);

    Sinon.restore();
  });

  it('testa não é possível autualizar uma motocicleta com id inválido', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    const response = await request(app).put('/motorcycles/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa que um erro é retornado caso uma motocicleta não seja localizado', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const response = await request(app).put('/motorcycles/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  it('testa se é possível deletar uma motocicleta da aplicação', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(DELETEDMOTO);

    const response = await request(app).delete('/motorcycles/634852326b35b59438fbea2f');

    expect(response.status).to.be.equal(204);
  });

  it('testa não é possível deletar uma moto com id inválido', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(false);

    const response = await request(app).delete('/motorcycles/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa o erro retornado caso um carro não seja localizado para deletar', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    const response = await request(app).delete('/motorcycles/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});