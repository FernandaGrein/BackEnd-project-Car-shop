import request from 'supertest';
import Sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import app from '../../../src/app';
import { CREATEMOTOOUTPUT, FINDALLMOTOS, MOTOFINDEDBYID, MOTOINPUT } from '../Mocks';

const MOTORCYCLEROUTE = '/motorcycles';
describe('testa as rotas Create e Find de Motorcycles', function () {
  it('testa se é possivel criar uma motorcycles com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(CREATEMOTOOUTPUT);

    const response = await request(app).post(MOTORCYCLEROUTE).send(MOTOINPUT);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(CREATEMOTOOUTPUT);

    Sinon.restore();
  });
  it('testa quando um erro de servidor é lançado na rota create/motorcycles', async function () {
    Sinon.stub(Model, 'create').throws();

    const response = await request(app).post(MOTORCYCLEROUTE).send();
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({ message: 'Error' });
  });

  it('testa se é possível buscar todas as motorcycles da aplicação', async function () {
    Sinon.stub(Model, 'find').resolves(FINDALLMOTOS);

    const response = await request(app).get(MOTORCYCLEROUTE);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(FINDALLMOTOS);
  });

  it('testa quando um erro de servidor é lançado na rota find/motorcycles', async function () {
    Sinon.stub(Model, 'find').throws();

    const response = await request(app).get(MOTORCYCLEROUTE).send();
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({ message: 'Error' });
  });

  it('testa se é possível buscar uma motorcycles por id', async function () {
    Sinon.stub(Model, 'findById').resolves(MOTOFINDEDBYID);

    const response = await request(app).get('/motorcycles/634852326b35b59438fbea31');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(MOTOFINDEDBYID);
  });

  it('testa se com um id inválido na rota motorcycles/id, um erro é retornado', async function () {
    Sinon.stub(Model, 'findById').resolves(false);

    const response = await request(app).get('/motorcycles/63f34c397a0b2');
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'Invalid mongo id' });
  });

  it('testa que um erro é retornado caso uma motorcycle não seja localizado', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    const response = await request(app).get('/motorcycles/6333513f34c337abcad040b2');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  afterEach(function () {
    Sinon.restore();
  });
});