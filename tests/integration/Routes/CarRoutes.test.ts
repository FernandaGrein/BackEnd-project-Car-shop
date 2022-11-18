import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { CARINPUT, CREATECAROUTPUT } from '../Mocks';

describe('testa as rotas de Car', function () {
  it('testa se é possivel criar um carro com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(CREATECAROUTPUT);

    const response = await request(app).post('/cars').send(CARINPUT);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(CREATECAROUTPUT);

    Sinon.restore();
  });

  // afterEach(function () {
  //   sinon.restore();
  // });
});