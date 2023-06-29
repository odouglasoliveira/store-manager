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

module.exports = {
  getAll,
  getById,
};
