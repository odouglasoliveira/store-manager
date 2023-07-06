const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateName } = require('../../../src/middlewares/productsMiddleware');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes do products middleware', function () {
  it('Testa se a função validateName funciona com um nome correto', function () {
    const productName = 'Produto de teste';
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateName(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testa se a função validateName funciona sem um nome', function () {
    const productName = '';
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
  });

  it('Testa se a função validateName funciona com um nome incorreto', function () {
    const productName = 'a';
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
  });

  afterEach(function () {
    sinon.restore();
  });
});