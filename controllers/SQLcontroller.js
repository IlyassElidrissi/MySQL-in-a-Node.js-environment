const { pool } = require('../db/mysql');

async function createProduct(req, res, next) {
  try {
    const { name, price, category, inStock } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'name and price are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)',
      [name, price, category || null, inStock === undefined ? true : inStock]
    );

    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    return res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const [existingRows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existing = existingRows[0];
    const { name, price, category, inStock } = req.body;
    const updatedValues = [
      name ?? existing.name,
      price ?? existing.price,
      category === undefined ? existing.category : category,
      inStock === undefined ? existing.inStock : inStock,
      req.params.id,
    ];

    await pool.execute(
      'UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?',
      updatedValues
    );

    const [updatedRows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    return res.json(updatedRows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
