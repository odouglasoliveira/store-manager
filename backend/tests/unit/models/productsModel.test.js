const chai = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/db/connection');

const { expect } = chai;

describe('Testes do products model', function () {
  it('Testa se a função findAll retorna todos os produtos', async function () {
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

    const expectedResponse = [
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
    sinon.stub(connection, 'execute').resolves([productsMock, []]);
    const products = await productsModel.findAll();
    expect(products).to.be.deep.equal(expectedResponse);
  });

  it('Testa se a função findById retorna o produto correto', async function () {
    const productMock = {
        id: 1,
        name: 'Martelo de Thor',
      };
    sinon.stub(connection, 'execute').resolves([[productMock], []]);
    const product = await productsModel.findById(1);
    expect(product).to.be.an('object');
    expect(product).to.have.keys('id', 'name');
    expect(product).to.have.property('id').equal(1);
    expect(product).to.have.property('name').equal('Martelo de Thor');
  });

  afterEach(function () {
    sinon.restore();
  });
});
