const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateSale, handleValidationError } = require('../../../src/middlewares/salesMiddleware');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes do sales middleware', function () {
  it('Testa se a função validateSale funciona corretamente quando passado um objeto na requisição', function () {
    const req = { body: { productId: 1, quantity: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateSale(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testa se a função handleValidationError funciona corretamente', function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = { details: [{ type: 'any.required' }] };
    handleValidationError(error, res);
    expect(res.status).to.have.been.calledWith(400);
  });

  it('Testa se a função handleValidationError retorna o status correto em caso de erro', function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const error = { details: [{ type: 'number.min' }] };
    handleValidationError(error, res);
    expect(res.status).to.have.been.calledWith(422);
  });

  afterEach(function () {
    sinon.restore();
  });
});