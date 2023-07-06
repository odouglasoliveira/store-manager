const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes do products controller', function () {
  it('Testa se a função findAll retorna o esperado', async function () {
    const productsMock = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do CapitÃ£o AmÃ©rica',
      },
    ];
    sinon.stub(productsService, 'findAll').resolves({ status: 'SUCCESS', data: productsMock });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const responseMock = [...productsMock];
    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseMock);
  });

  it('Testa se a função findById retorna o produto esperado', async function () {
    const productsMock = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ];
    sinon.stub(productsService, 'findById').resolves({ status: 'SUCCESS', data: productsMock });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const responseMock = [...productsMock];
    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseMock);
  });

  it('Testa se a função findById retorna esperado se não houver produto com o id', async function () {
    const productsMock = [];
    sinon.stub(productsService, 'findById').resolves({ status: 'NOT_FOUND', data: productsMock });
    const req = { params: { id: 4 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const responseMock = [...productsMock];
    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(responseMock);
  });

  it('Testa se a função createProduct retorna o objeto esperado', async function () {
    const productName = 'Produto de teste';
    const productMock = { id: 1, name: productName };
    const req = { body: { name: productName } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const expectedResponse = { id: 1, name: productName };
    sinon.stub(productsService, 'createProduct').resolves({ data: productMock });
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(expectedResponse);
  });

  afterEach(function () {
    sinon.restore();
  });
});