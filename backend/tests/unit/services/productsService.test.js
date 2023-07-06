const chai = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const connection = require('../../../src/db/connection');

const { expect } = chai;

describe('Testes do products service', function () {
  it('Testa se a função findAll retorna o objeto esperado', async function () {
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
    const responseMock = [...productsMock];
    sinon.stub(connection, 'execute').resolves([productsMock, []]);
    expect((await productsService.findAll()).status).to.be.equal('SUCCESS');
    expect((await productsService.findAll()).data).to.be.deep.equal(responseMock);
    expect((await productsService.findAll()).data).to.have.length(3);
  });

  it('Testa se a função findById tem o retorno esperado', async function () {
    const productMock = {
      status: 'SUCCESS',
      data: {
        id: 1,
        name: 'Martelo de Thor',
      },
    };
    sinon.stub(connection, 'execute').resolves([[productMock]], []);
    const serviceResponse = await productsService.findById(1);
    expect(serviceResponse.status).to.be.equal('SUCCESS');
    expect(serviceResponse.data).to.have.keys('data', 'status');
  });

  it('Testa se a função findById tem o retorno esperado sem um id correspondente', async function () {
    sinon.stub(connection, 'execute').resolves([[]], []);
    const serviceResponse = await productsService.findById(10);
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.have.key('message');
    expect(serviceResponse.data.message).to.include('Product not found');
  });

  it('Testa se a função createProduct tem o retorno correto', async function () {
    const productName = 'Produto de teste';
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const serviceResponse = await productsService.createProduct(productName);
    const expectedData = { id: 1, name: productName };
    expect(serviceResponse.status).to.be.equal('SUCCESS');
    expect(serviceResponse.data).to.be.deep.equal(expectedData);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});