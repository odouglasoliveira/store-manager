const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes do sales controller', function () {
  it('Testa se a função getAll retorna o esperado', async function () {
    const salesMock = [
      {
        saleId: 1,
        date: '2023-07-06T17:41:59.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2023-07-06T17:42:59.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-07-06T17:43:59.000Z',
        productId: 3,
        quantity: 15,
      },
    ];
    sinon.stub(salesService, 'getAll').resolves({ status: 'SUCCESS', data: salesMock });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const expectedResponse = { status: 'SUCCESS', data: salesMock };
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(expectedResponse.data);
  });

  it('Testa se a função getById tem o retorno esperado quando o id existe', async function () {
    const salesMock = [
      {
        date: '2023-07-06T17:44:59.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-07-06T17:45:59.000Z',
        productId: 2,
        quantity: 10,
      },
    ];
    sinon.stub(salesService, 'getById').resolves({ status: 'SUCCESS', data: salesMock });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const expectedResponse = { status: 'SUCCESS', data: salesMock };
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(expectedResponse.data);
  });

  it('Testa se a função getById tem o retorno esperado quando o id não existe', async function () {
    const salesMock = {
      message: 'Sale not found',
    };
    sinon.stub(salesService, 'getById').resolves({ status: 'NOT_FOUND', data: salesMock });
    const req = { params: { id: 10 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const expectedResponse = { message: 'Sale not found' };
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(expectedResponse);
  });

  it('Testa se a função insert tem o retorno esperado', async function () {
    const productName = 'Produto de teste';
    const productMock = { id: 1, name: productName };
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const expectedResponse = { id: 1, name: productName };
    sinon.stub(salesService, 'insert').resolves({ status: 'SUCCESS', data: productMock });
    await salesController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(expectedResponse);
  });

  afterEach(function () {
    sinon.restore();
  });
});