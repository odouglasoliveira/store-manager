const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/db/connection');

const { expect } = chai;

describe('Testes do sales model', function () {
  it('Testa se a função getAll retorna o array correto', async function () {
    const salesMock = [
      {
        saleId: 1,
        date: '2023-06-29T18:53:03.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2023-06-29T18:53:03.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-06-29T18:53:03.000Z',
        productId: 3,
        quantity: 15,
      },
    ];
    sinon.stub(connection, 'execute').resolves([salesMock, []]);
    const responseMock = [...salesMock];
    const sales = await salesModel.getAll();
    expect(sales).to.be.deep.equal(responseMock);
  });

  it('testa se a função getById retorna as vendas corretas', async function () {
    const salesMock1 = [
      {
        date: '2023-06-29T19:04:11.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-06-29T19:04:11.000Z',
        productId: 2,
        quantity: 10,
      },
    ];
    sinon.stub(connection, 'execute').resolves([salesMock1, []]);
    const responseMock1 = [...salesMock1];
    const sales = await salesModel.getById(1);
    expect(sales).to.be.deep.equal(responseMock1);
  });

  afterEach(function () {
    sinon.restore();
  });
});