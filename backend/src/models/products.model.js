const connection = require('../db/connection');

const findAll = async () => {
  const [results] = await connection.execute('SELECT * FROM StoreManager.products;');
  return results;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?;',
   [id],
);
  return result;
};

const createProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
     [name],
);
const { insertId } = result;
  return { id: insertId, name };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
