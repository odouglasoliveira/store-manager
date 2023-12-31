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
    'INSERT INTO StoreManager.products (name) VALUE (?)',
     [name],
);
const { insertId } = result;
  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
);
  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
