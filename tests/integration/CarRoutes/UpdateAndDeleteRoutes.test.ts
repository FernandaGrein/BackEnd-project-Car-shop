import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { CARTOUPDATEINPUT, DELETEDCAR, UPDATEDCAROUTPUT } from '../Mocks';

describe('testa as rotas Update e Delete de Car', function () {
  it('testa se é possivel editar um carro com sucesso', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(UPDATEDCAROUTPUT);

    const response = await request(app)
      .put('/cars/634852326b35b59438fbea2f').send(CARTOUPDATEINPUT);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(UPDATEDCAROUTPUT);

    Sinon.restore();
  });

  it('testa não é possível autualizar um carro com id inválido', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    const response = await request(app).put('/cars/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa que um erro é retornado caso um carro não seja localizado', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const response = await request(app).put('/cars/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Car not found' });
  });

  it('testa se é possível deletar um carro da aplicação', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(DELETEDCAR);

    const response = await request(app).delete('/cars/634852326b35b59438fbea2f');

    expect(response.status).to.be.equal(204);
  });

  it('testa não é possível deletar um carro com id inválido', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(false);

    const response = await request(app).delete('/cars/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa o erro retornado caso um carro não seja localizado para deletar', async function () {
    Sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    const response = await request(app).delete('/cars/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Car not found' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});