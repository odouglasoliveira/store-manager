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

module.exports = {
  findAll,
  findById,
};
