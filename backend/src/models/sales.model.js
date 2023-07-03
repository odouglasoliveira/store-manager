const connection = require('../db/connection');

const getAll = async () => {
  const [results] = await connection.execute(
    ` SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
      ORDER BY s.id;`,
);
  return results;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    ` SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.sale_id;
    `,
   [id],
);
  return result;
};

const insert = async (sales) => {
  const [response] = await connection.execute('INSERT INTO StoreManager.sales VALUES ()', []);
  const { insertId } = response;
  sales.forEach(async (sale) => connection.execute(
  'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
  [insertId, sale.productId, sale.quantity],
));
return { id: insertId, itemsSold: sales };
};

module.exports = {
  getAll,
  getById,
  insert,
};
