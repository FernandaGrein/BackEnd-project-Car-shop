import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { ALLCARSOUTPUT, CARINPUT, CREATECAROUTPUT, FINDCARBYID } from '../Mocks';

describe('testa as rotas Create e Find de Car', function () {
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

  it('testa se é possível buscar um carro por id', async function () {
    Sinon.stub(Model, 'findById').resolves(FINDCARBYID);

    const response = await request(app).get('/cars/6348513f34c397abcad040b2');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(FINDCARBYID);
  });

  it('testa se com um id inválido na rota cars/id, um erro é retornado', async function () {
    Sinon.stub(Model, 'findById').resolves(false);

    const response = await request(app).get('/cars/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa que um erro é retornado caso um carro não seja localizado', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    const response = await request(app).get('/cars/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Car not found' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});