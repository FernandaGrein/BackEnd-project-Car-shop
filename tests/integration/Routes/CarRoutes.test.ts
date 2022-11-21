import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { ALLCARSOUTPUT, CARINPUT, CREATECAROUTPUT } from '../Mocks';

describe('testa as rotas de Car', function () {
  it('testa se é possivel criar um carro com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(CREATECAROUTPUT);

    const response = await request(app).post('/cars').send(CARINPUT);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(CREATECAROUTPUT);

    Sinon.restore();
  });
  it('testa quando um erro de servidor é lançado na rota create/cars', async function () {
    Sinon.stub(Model, 'create').throws();

    const response = await request(app).post('/cars').send();
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({ message: 'Error' });
  });

  it('testa se é possível buscar todos os carros da aplicação', async function () {
    Sinon.stub(Model, 'find').resolves(ALLCARSOUTPUT);

    const response = await request(app).get('/cars');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(ALLCARSOUTPUT);
  });

  afterEach(function () {
    Sinon.restore();
  });
});