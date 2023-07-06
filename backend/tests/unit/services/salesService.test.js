const chai = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const connection = require('../../../src/db/connection');

const { expect } = chai;

describe('Testes do sales service', function () {
  const dateMock = '2023-06-29T19:16:13.000Z';
  it('Testa se a função getAll tem o retorno esperado', async function () {
    const salesMock = [
      {
        saleId: 1,
        date: dateMock,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: dateMock,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: dateMock,
        productId: 3,
        quantity: 15,
      },
    ];
    sinon.stub(connection, 'execute').resolves([salesMock, []]);
    const responseMock = [...salesMock];
    const serviceResponse = await salesService.getAll();
    expect(serviceResponse.status).to.be.equal('SUCCESS');
    expect(serviceResponse.data).to.be.deep.equal(responseMock);
  });

  it('Testa se a função getById tem o retorno esperado quando o ID existe', async function () {
    const salesMock = [
      {
        date: dateMock,
        productId: 1,
        quantity: 5,
      },
      {
        date: dateMock,
        productId: 2,
        quantity: 10,
      },
    ];
    sinon.stub(connection, 'execute').resolves([salesMock, []]);
    const responseMock = [...salesMock];
    const serviceResponse = await salesService.getById(1);
    expect(serviceResponse.status).to.be.equal('SUCCESS');
    expect(serviceResponse.data).to.be.deep.equal(responseMock);
  });

  it('Testa se a função getById tem o retorno esperado quando o ID não existe', async function () {
    const salesMock = [];
    sinon.stub(connection, 'execute').resolves([salesMock, []]);
    const serviceResponse = await salesService.getById(0);
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testa se a função insert tem o retorno esperado', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([{ insertId: 1 }]);
    const sale = {
      productId: 2,
      quantity: 10,
    };
    const expectedResponse = {
      status: 'SUCCESS',
      data: {
        id: 1,
        itemsSold: [sale],
      },
    };
    const result = await salesService.insert([sale]);
    expect(result).to.be.deep.equal(expectedResponse);
  });

  afterEach(function () {
    sinon.restore();
  });
});